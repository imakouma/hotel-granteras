"use client";

import Link from "next/link";

/** 画像は後から追加するため、同じサイズのスペースを確保 */
const BANNER_ASPECT = "aspect-[21/9]"; // 横長バナー
const CARD_IMAGE_ASPECT = "aspect-[4/3]"; // カード画像は4:3で統一
const CARD_COUNT = 8; // クーポンカード数（画像追加用スロット）

export default function CouponPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-[#304E84] hover:underline"
          >
            ← 館内案内に戻る
          </Link>
          <h1 className="text-base font-bold text-gray-900 sm:text-lg">
            飲食店クーポン
          </h1>
          <div className="w-16 sm:w-20" aria-hidden />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* メインバナー（画像用スペース・同じサイズで統一） */}
        <section className="mb-8">
          <div
            className={`w-full overflow-hidden rounded-lg bg-gray-200 ${BANNER_ASPECT} max-h-[280px] sm:max-h-[320px]`}
          >
            {/* 画像追加用：ここにバナー画像を配置 */}
            <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm">
              バナー画像
            </div>
          </div>
        </section>

        {/* 紹介文エリア（元サイトのコピー用スペース） */}
        <section className="mb-8 text-center">
          <p className="text-sm text-gray-600 sm:text-base">
            当ホテル限定の提携クーポンで、人気店の絶品グルメが特別割引に。
            <br className="hidden sm:inline" />
            クーポン画面を提示するだけの簡単ステップでお得にご利用いただけます。
          </p>
        </section>

        {/* クーポンカードグリッド（各カード同じサイズの画像スペース） */}
        <section className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: CARD_COUNT }, (_, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* カード画像用スペース（同じサイズで統一・画像追加用） */}
              <div className={`w-full bg-gray-100 ${CARD_IMAGE_ASPECT}`}>
                <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">
                  画像
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
                  店舗名・クーポン名
                </h2>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  説明文
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* 下部バナー用スペース（必要に応じて画像追加） */}
        <section className="mt-10">
          <div
            className={`w-full overflow-hidden rounded-lg bg-gray-200 ${BANNER_ASPECT} max-h-[200px] sm:max-h-[240px]`}
          >
            <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm">
              下部バナー画像
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
