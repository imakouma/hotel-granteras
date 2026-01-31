"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LanguageCode } from "@/contexts/LanguageContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const chatTranslations: Record<
  string,
  {
    welcome: string;
    headerTitle: string;
    placeholder: string;
    placeholderSending: string;
    thinking: string;
    error: string;
    quotaExceeded: string;
    replyError: string;
    openAria: string;
    closeAria: string;
    sendAria: string;
    closeLabel: string;
  }
> = {
  ja: {
    welcome:
      "こんにちは。天然温泉 青葉の湯 ドーミーイン仙台ANNEXの館内案内です。チェックイン・朝食・大浴場・Wi-Fiなど、ご不明な点がございましたらお気軽にどうぞ。",
    headerTitle: "館内案内チャット",
    placeholder: "メッセージを入力...",
    placeholderSending: "送信中...",
    thinking: "考え中...",
    error: "エラーが発生しました。",
    quotaExceeded: "無料枠の制限に達しました。1分ほど待ってから再度お試しください。",
    replyError: "申し訳ございません。回答を生成できませんでした。",
    openAria: "チャットを開く",
    closeAria: "チャットを閉じる",
    sendAria: "送信",
    closeLabel: "閉じる",
  },
  en: {
    welcome:
      "Hello. This is the in-house guide for Natural Hot Spring Aoba no Yu Dormy Inn Sendai ANNEX. Feel free to ask about check-in, breakfast, the public bath, Wi-Fi, and more.",
    headerTitle: "Hotel Guide Chat",
    placeholder: "Type a message...",
    placeholderSending: "Sending...",
    thinking: "Thinking...",
    error: "An error occurred.",
    quotaExceeded: "Rate limit reached. Please try again in about a minute.",
    replyError: "Sorry, we could not generate a reply.",
    openAria: "Open chat",
    closeAria: "Close chat",
    sendAria: "Send",
    closeLabel: "Close",
  },
  zh: {
    welcome: "您好。这里是天然温泉青叶之汤 Dormy Inn 仙台 ANNEX 的馆内指南。如有关于入住、早餐、大浴场、Wi-Fi等任何疑问，欢迎随时咨询。",
    headerTitle: "馆内指南聊天",
    placeholder: "输入消息...",
    placeholderSending: "发送中...",
    thinking: "思考中...",
    error: "发生错误。",
    quotaExceeded: "已达到使用限制，请约一分钟后重试。",
    replyError: "抱歉，无法生成回复。",
    openAria: "打开聊天",
    closeAria: "关闭聊天",
    sendAria: "发送",
    closeLabel: "关闭",
  },
  "zh-TW": {
    welcome: "您好。這裡是天然溫泉青葉之湯 Dormy Inn 仙台 ANNEX 的館內指南。如有關於入住、早餐、大浴場、Wi-Fi等任何疑問，歡迎隨時諮詢。",
    headerTitle: "館內指南聊天",
    placeholder: "輸入訊息...",
    placeholderSending: "傳送中...",
    thinking: "思考中...",
    error: "發生錯誤。",
    quotaExceeded: "已達到使用限制，請約一分鐘後重試。",
    replyError: "抱歉，無法產生回覆。",
    openAria: "開啟聊天",
    closeAria: "關閉聊天",
    sendAria: "傳送",
    closeLabel: "關閉",
  },
  ko: {
    welcome:
      "안녕하세요. 천연 온천 아오바노유 도미인 센다이 ANNEX 관내 안내입니다. 체크인, 조식, 대욕장, Wi-Fi 등 궁금한 점이 있으시면 편하게 문의해 주세요.",
    headerTitle: "관내 안내 채팅",
    placeholder: "메시지 입력...",
    placeholderSending: "전송 중...",
    thinking: "생각 중...",
    error: "오류가 발생했습니다.",
    quotaExceeded: "이용 한도에 도달했습니다. 약 1분 후에 다시 시도해 주세요.",
    replyError: "죄송합니다. 답변을 생성할 수 없습니다.",
    openAria: "채팅 열기",
    closeAria: "채팅 닫기",
    sendAria: "전송",
    closeLabel: "닫기",
  },
  fr: {
    welcome:
      "Bonjour. Bienvenue au guide de l'hôtel Dormy Inn Sendai ANNEX (source thermale Aoba no Yu). N'hésitez pas à nous demander des informations sur l'enregistrement, le petit-déjeuner, le bain, le Wi-Fi, etc.",
    headerTitle: "Chat d'accueil",
    placeholder: "Écrivez un message...",
    placeholderSending: "Envoi...",
    thinking: "Réflexion...",
    error: "Une erreur s'est produite.",
    quotaExceeded: "Limite atteinte. Veuillez réessayer dans une minute.",
    replyError: "Désolé, impossible de générer une réponse.",
    openAria: "Ouvrir le chat",
    closeAria: "Fermer le chat",
    sendAria: "Envoyer",
    closeLabel: "Fermer",
  },
  de: {
    welcome:
      "Guten Tag. Dies ist der Hausführer des Dormy Inn Sendai ANNEX (Natürliche heiße Quelle Aoba no Yu). Bei Fragen zu Check-in, Frühstück, Bad, WLAN usw. fragen Sie uns gerne.",
    headerTitle: "Hotel-Chat",
    placeholder: "Nachricht eingeben...",
    placeholderSending: "Wird gesendet...",
    thinking: "Denke nach...",
    error: "Ein Fehler ist aufgetreten.",
    quotaExceeded: "Limit erreicht. Bitte in etwa einer Minute erneut versuchen.",
    replyError: "Entschuldigung, die Antwort konnte nicht erstellt werden.",
    openAria: "Chat öffnen",
    closeAria: "Chat schließen",
    sendAria: "Senden",
    closeLabel: "Schließen",
  },
  es: {
    welcome:
      "Hola. Este es el guía del hotel Dormy Inn Sendai ANNEX (aguas termales Aoba no Yu). Puede preguntar sobre check-in, desayuno, baño, Wi-Fi, etc.",
    headerTitle: "Chat de información",
    placeholder: "Escriba un mensaje...",
    placeholderSending: "Enviando...",
    thinking: "Pensando...",
    error: "Se ha producido un error.",
    quotaExceeded: "Límite alcanzado. Inténtelo de nuevo en un minuto.",
    replyError: "Lo sentimos, no se pudo generar la respuesta.",
    openAria: "Abrir chat",
    closeAria: "Cerrar chat",
    sendAria: "Enviar",
    closeLabel: "Cerrar",
  },
  it: {
    welcome:
      "Buongiorno. Questa è la guida dell'hotel Dormy Inn Sendai ANNEX (sorgente termale Aoba no Yu). Chiedete pure su check-in, colazione, bagno, Wi-Fi, ecc.",
    headerTitle: "Chat informazioni",
    placeholder: "Scrivi un messaggio...",
    placeholderSending: "Invio in corso...",
    thinking: "Elaborazione...",
    error: "Si è verificato un errore.",
    quotaExceeded: "Limite raggiunto. Riprova tra un minuto.",
    replyError: "Spiacenti, impossibile generare la risposta.",
    openAria: "Apri chat",
    closeAria: "Chiudi chat",
    sendAria: "Invia",
    closeLabel: "Chiudi",
  },
  th: {
    welcome:
      "สวัสดีครับ นี่คือคำแนะนำภายในโรงแรม Dormy Inn Sendai ANNEX (น้ำพุร้อน Aoba no Yu) สอบถามได้เกี่ยวกับเช็คอิน อาหารเช้า ห้องอาบน้ำ Wi-Fi ฯลฯ",
    headerTitle: "แชทข้อมูลโรงแรม",
    placeholder: "พิมพ์ข้อความ...",
    placeholderSending: "กำลังส่ง...",
    thinking: "กำลังคิด...",
    error: "เกิดข้อผิดพลาด",
    quotaExceeded: "ถึงขีดจำกัดแล้ว กรุณาลองใหม่ในอีกประมาณหนึ่งนาที",
    replyError: "ขออภัย ไม่สามารถสร้างคำตอบได้",
    openAria: "เปิดแชท",
    closeAria: "ปิดแชท",
    sendAria: "ส่ง",
    closeLabel: "ปิด",
  },
  vi: {
    welcome:
      "Xin chào. Đây là hướng dẫn trong khách sạn Dormy Inn Sendai ANNEX (suối nước nóng Aoba no Yu). Vui lòng hỏi về check-in, bữa sáng, bồn tắm, Wi-Fi, v.v.",
    headerTitle: "Chat hướng dẫn",
    placeholder: "Nhập tin nhắn...",
    placeholderSending: "Đang gửi...",
    thinking: "Đang suy nghĩ...",
    error: "Đã xảy ra lỗi.",
    quotaExceeded: "Đã đạt giới hạn. Vui lòng thử lại sau khoảng một phút.",
    replyError: "Xin lỗi, không thể tạo câu trả lời.",
    openAria: "Mở chat",
    closeAria: "Đóng chat",
    sendAria: "Gửi",
    closeLabel: "Đóng",
  },
  id: {
    welcome:
      "Halo. Ini panduan dalam hotel Dormy Inn Sendai ANNEX (sumber air panas Aoba no Yu). Silakan tanya tentang check-in, sarapan, pemandian, Wi-Fi, dll.",
    headerTitle: "Chat panduan",
    placeholder: "Ketik pesan...",
    placeholderSending: "Mengirim...",
    thinking: "Memikirkan...",
    error: "Terjadi kesalahan.",
    quotaExceeded: "Batas tercapai. Silakan coba lagi dalam satu menit.",
    replyError: "Maaf, tidak dapat membuat balasan.",
    openAria: "Buka chat",
    closeAria: "Tutup chat",
    sendAria: "Kirim",
    closeLabel: "Tutup",
  },
  pt: {
    welcome:
      "Olá. Este é o guia do hotel Dormy Inn Sendai ANNEX (fonte termal Aoba no Yu). Pergunte sobre check-in, pequeno-almoço, banho, Wi-Fi, etc.",
    headerTitle: "Chat de informações",
    placeholder: "Escreva uma mensagem...",
    placeholderSending: "A enviar...",
    thinking: "A pensar...",
    error: "Ocorreu um erro.",
    quotaExceeded: "Limite atingido. Tente novamente dentro de um minuto.",
    replyError: "Desculpe, não foi possível gerar a resposta.",
    openAria: "Abrir chat",
    closeAria: "Fechar chat",
    sendAria: "Enviar",
    closeLabel: "Fechar",
  },
  tl: {
    welcome:
      "Hello. Ito ang gabay ng Dormy Inn Sendai ANNEX (hot spring Aoba no Yu). Magtanong tungkol sa check-in, almusal, paliguan, Wi-Fi, atbp.",
    headerTitle: "Chat gabay",
    placeholder: "Mag-type ng mensahe...",
    placeholderSending: "Nagse-send...",
    thinking: "Nag-iisip...",
    error: "May nangyaring error.",
    quotaExceeded: "Naabot na ang limit. Subukan muli makalipas ang isang minuto.",
    replyError: "Paumanhin, hindi makabuo ng sagot.",
    openAria: "Buksan ang chat",
    closeAria: "Isara ang chat",
    sendAria: "Ipadala",
    closeLabel: "Isara",
  },
  ms: {
    welcome:
      "Helo. Ini panduan dalam hotel Dormy Inn Sendai ANNEX (mata air panas Aoba no Yu). Sila tanya tentang daftar masuk, sarapan, mandi, Wi-Fi, dll.",
    headerTitle: "Chat panduan",
    placeholder: "Taip mesej...",
    placeholderSending: "Menghantar...",
    thinking: "Berfikir...",
    error: "Ralat berlaku.",
    quotaExceeded: "Had dicapai. Sila cuba lagi dalam satu minit.",
    replyError: "Maaf, tidak dapat menjana jawapan.",
    openAria: "Buka chat",
    closeAria: "Tutup chat",
    sendAria: "Hantar",
    closeLabel: "Tutup",
  },
};

function getChatT(lang: LanguageCode) {
  return chatTranslations[lang] ?? chatTranslations.en;
}

export default function ChatBot() {
  const { language } = useLanguage();
  const t = getChatT(language);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "assistant", content: chatTranslations.ja.welcome },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages((prev) =>
      prev.length === 0
        ? [{ role: "assistant", content: t.welcome }]
        : [{ role: "assistant", content: t.welcome }, ...prev.slice(1)]
    );
  }, [language, t.welcome]);

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
        body: JSON.stringify({ message: text, language }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const isQuotaExceeded = res.status === 429 || data?.code === "QUOTA_EXCEEDED";
        const errorContent = isQuotaExceeded
          ? t.quotaExceeded
          : data?.error
            ? `${t.error}\n${typeof data.error === "string" ? data.error : ""}`
            : t.error;
        setMessages((prev) => [...prev, { role: "assistant", content: errorContent }]);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || t.replyError },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t.error }]);
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
        aria-label={isOpen ? t.closeAria : t.openAria}
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
            <span className="font-semibold">{t.headerTitle}</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={t.closeLabel}
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
                    {t.thinking}
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
                placeholder={isLoading ? t.placeholderSending : t.placeholder}
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
                aria-label={t.sendAria}
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
