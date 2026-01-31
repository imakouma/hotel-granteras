import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";
import { join } from "path";

const SYSTEM_PROMPT_PREFIX = `あなたは「天然温泉 青葉の湯 ドーミーイン仙台ANNEX」の館内案内アシスタントです。
以下のホテル情報を参照し、お客様の質問に丁寧かつ正確に答えてください。
- 館内の基本情報（チェックイン・朝食・温泉・設備など）に加え、「近隣のおすすめ」や「独自の特典」（提携店のワンドリンク・カフェ優待・深夜ラーメン案内など）についても、知識ベースに記載された範囲で案内してください。
- 回答は簡潔に、必要な情報だけを伝えてください。
- 知識ベースにない情報（具体的なパスワードなど）を聞かれた場合は「フロント（内線9番）へお問い合わせください」と案内してください。観光案内の際は松島観光の拠点としての利便性をアピールしてください。

## ホテル情報（参照用）
`;

function loadHotelInfo(): string {
  try {
    const filePath = join(process.cwd(), "data", "hotel-info.md");
    const content = readFileSync(filePath, "utf-8");
    return content;
  } catch (e) {
    console.error("Failed to load hotel-info.md:", e);
    return "（館内情報の読み込みに失敗しました。フロントまでお尋ねください。）";
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || typeof apiKey !== "string" || !apiKey.trim()) {
    console.error("[Chat API] GEMINI_API_KEY が設定されていません。.env.local を確認してください。");
    return NextResponse.json(
      { error: "APIキーが設定されていません。しばらく経ってからお試しください。" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const userMessage = body.message as string | undefined;
    if (typeof userMessage !== "string" || !userMessage.trim()) {
      return NextResponse.json(
        { error: "message を送信してください。" },
        { status: 400 }
      );
    }

    const hotelInfo = loadHotelInfo();
    const genAI = new GoogleGenerativeAI(apiKey);
    const fullPrompt = `${SYSTEM_PROMPT_PREFIX}\n${hotelInfo}\n\n---\n上記のホテル情報を参照して、以下のお客様の質問に答えてください。\n\n【質問】\n${userMessage.trim()}`;

    const modelIds = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash"] as const;
    const maxRetries = 3;
    const quotaExceededMessage = "無料枠の制限に達しました。1分ほど待ってから再度お試しください。";
    let result: Awaited<ReturnType<ReturnType<GoogleGenerativeAI["getGenerativeModel"]>["generateContent"]>> | null = null;
    let lastError: unknown = null;

    for (const modelId of modelIds) {
      const model = genAI.getGenerativeModel({ model: modelId });
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          result = await model.generateContent(fullPrompt);
          break;
        } catch (e) {
          lastError = e;
          const msg = e instanceof Error ? e.message : String(e);
          const is404 = msg.includes("404") || msg.includes("not found");
          const is429 =
            msg.includes("429") ||
            msg.includes("quota") ||
            msg.includes("Too Many Requests") ||
            msg.includes("Quota exceeded");
          if (is404) {
            console.warn(`[Chat API] モデル ${modelId} は利用できません。次のモデルを試します。`);
            break;
          }
          if (is429 && attempt < maxRetries - 1) {
            const delayMs = Math.pow(2, attempt) * 1000;
            console.warn(
              `[Chat API] 429 検出。${delayMs / 1000}秒後に再試行します（${attempt + 1}/${maxRetries}）`
            );
            await new Promise((r) => setTimeout(r, delayMs));
            continue;
          }
          if (is429 && attempt === maxRetries - 1) {
            return NextResponse.json({ error: quotaExceededMessage, code: "QUOTA_EXCEEDED" }, { status: 429 });
          }
          throw e;
        }
      }
      if (result) break;
    }

    if (!result) {
      console.error("[Chat API] 利用可能なモデルがありません:", lastError);
      throw lastError ?? new Error("モデルで回答を取得できませんでした。");
    }

    const response = result.response;

    if (!response.candidates || response.candidates.length === 0) {
      const blockReason = response.promptFeedback?.blockReason;
      console.error("[Chat API] Gemini が回答を返しませんでした:", blockReason, response.promptFeedback);
      return NextResponse.json(
        { error: "回答を生成できませんでした。内容を変えて再度お試しください。" },
        { status: 500 }
      );
    }

    const text = response.text();
    return NextResponse.json({ reply: text || "申し訳ございません。回答を生成できませんでした。" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Chat API] エラー:", err);
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? `チャットの処理中にエラーが発生しました。（${message}）`
        : "チャットの処理中にエラーが発生しました。しばらく経ってからお試しください。";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
