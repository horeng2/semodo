import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">빠른 시작</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <li className="rounded-xl border bg-white p-4">
          <h2 className="mb-2 text-lg font-medium">복리 계산기</h2>
          <p className="mb-3 text-sm text-neutral-600">원금/이율/기간/월납입으로 시나리오 계산 후 저장/공유</p>
          <Link href="#compound" className="text-blue-600 underline">
            바로가기
          </Link>
        </li>
        <li className="rounded-xl border bg-white p-4 opacity-70">
          <h2 className="mb-2 text-lg font-medium">주택청약 모음 (준비중)</h2>
          <p className="mb-3 text-sm text-neutral-600">공공·민영 일정 정규화/검색</p>
        </li>
      </ul>

      <section id="compound" className="pt-6">
        <h2 className="mb-4 text-xl font-semibold">복리 계산기</h2>
        {/* CSR 컴포넌트 분리 */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <div suppressHydrationWarning>{/* Client Component */}</div>
      </section>
    </div>
  );
}
