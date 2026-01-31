"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "こんにちは。天然温泉 青葉の湯 ドーミーイン仙台ANNEXの館内案内です。チェックイン・朝食・大浴場・Wi-Fiなど、ご不明な点がございましたらお気軽にどうぞ。",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setIsLoading(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const isQuotaExceeded = res.status === 429 || data?.code === "QUOTA_EXCEEDED";
        const errorContent = isQuotaExceeded
          ? "無料枠の制限に達しました。1分ほど待ってから再度お試しください。"
          : data?.error
            ? `エラーが発生しました。\n${typeof data.error === "string" ? data.error : ""}`
            : "エラーが発生しました。";
        setMessages((prev) => [...prev, { role: "assistant", content: errorContent }]);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "申し訳ございません。回答を生成できませんでした。" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "エラーが発生しました。" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) sendMessage();
    }
  };

  return (
    <>
      {/* フローティングボタン */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#304E84] text-white shadow-lg transition-all hover:bg-[#243a63] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#304E84] focus:ring-offset-2"
        aria-label={isOpen ? "チャットを閉じる" : "チャットを開く"}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* チャット窓 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[420px] max-h-[min(420px,80dvh)] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {/* ヘッダー */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-[#304E84] px-4 py-3 text-white">
            <span className="font-semibold">館内案内チャット</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="閉じる"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* メッセージ一覧 */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-[#304E84] text-white"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap wrap-break-word">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-2xl bg-white px-4 py-2.5 shadow-sm border border-gray-100">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="inline-flex gap-1">
                      <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                      <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                      <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                    </span>
                    考え中...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア（iOSでフォーカス時にズームしないよう text-base 16px 指定） */}
          <div className="border-t border-gray-100 bg-white p-3 touch-manipulation">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "送信中..." : "メッセージを入力..."}
                rows={2}
                disabled={isLoading}
                readOnly={isLoading}
                className="flex-1 min-h-0 resize-none rounded-lg border border-gray-200 px-3 py-2 text-base placeholder-gray-400 focus:border-[#304E84] focus:outline-none focus:ring-1 focus:ring-[#304E84] disabled:bg-gray-50 disabled:cursor-not-allowed"
                style={{ fontSize: "16px" }}
              />
              <button
                type="button"
                onClick={() => !isLoading && sendMessage()}
                disabled={!input.trim() || isLoading}
                className="self-end rounded-lg bg-[#304E84] px-4 py-2 text-white transition-colors hover:bg-[#243a63] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#304E84]"
                aria-label="送信"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
