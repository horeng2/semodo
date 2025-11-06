"use client";
import { useMemo, useState } from "react";
import { z } from "zod";
import { CompoundInputSchema, type CompoundInput } from "@/lib/zod-schemas";

function compute({ principal, rate, years, n, monthly }: CompoundInput) {
  const r = rate / 100;
  // 매월 납입을 포함한 미래가치 (연 n회 복리, 월납입은 12개월 기준 단순화)
  const periods = years * n;
  const per = r / n;
  const futureLump = principal * Math.pow(1 + per, periods);
  const monthlyR = r / 12;
  const months = Math.round(years * 12);
  const futureMonthly = monthlyR === 0 ? monthly * months : (monthly * (Math.pow(1 + monthlyR, months) - 1)) / monthlyR;
  const future = futureLump + futureMonthly;
  return { future, futureLump, futureMonthly };
}

export default function CompoundForm() {
  const [form, setForm] = useState<CompoundInput>({ principal: 0, rate: 5, years: 10, n: 12, monthly: 0 });
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  const parsed = useMemo(() => CompoundInputSchema.safeParse(form), [form]);
  const result = useMemo(() => (parsed.success ? compute(parsed.data) : null), [parsed]);

  const onSave = async () => {
    if (!parsed.success || !title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, tool: "compound", data: parsed.data }),
      });
      const json = await res.json();
      if (res.ok) setSlug(json.publicSlug);
      else alert("저장 실패: " + JSON.stringify(json.error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-4 rounded-xl border bg-white p-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <label className="grid gap-1">
          <span className="text-sm text-neutral-600">원금</span>
          <input
            type="number"
            className="rounded border px-2 py-1"
            value={form.principal}
            onChange={(e) => setForm({ ...form, principal: Number(e.target.value) })}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-neutral-600">연이율(%)</span>
          <input
            type="number"
            className="rounded border px-2 py-1"
            value={form.rate}
            onChange={(e) => setForm({ ...form, rate: Number(e.target.value) })}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-neutral-600">기간(년)</span>
          <input
            type="number"
            className="rounded border px-2 py-1"
            value={form.years}
            onChange={(e) => setForm({ ...form, years: Number(e.target.value) })}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-neutral-600">복리주기(연 n회)</span>
          <input
            type="number"
            className="rounded border px-2 py-1"
            value={form.n}
            onChange={(e) => setForm({ ...form, n: Number(e.target.value) })}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-neutral-600">월 추가 납입</span>
          <input
            type="number"
            className="rounded border px-2 py-1"
            value={form.monthly}
            onChange={(e) => setForm({ ...form, monthly: Number(e.target.value) })}
          />
        </label>
      </div>

      {result && (
        <div className="rounded-md bg-neutral-50 p-3 text-sm">
          <div>
            미래가치(합계): <b>{Math.round(result.future).toLocaleString()}</b>
          </div>
          <div>원금 복리: {Math.round(result.futureLump).toLocaleString()}</div>
          <div>월납입 적립: {Math.round(result.futureMonthly).toLocaleString()}</div>
        </div>
      )}

      <div className="mt-2 grid gap-2 md:grid-cols-3">
        <input
          placeholder="시나리오 제목"
          className="rounded border px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={onSave}
          disabled={saving || !parsed.success || !title.trim()}
          className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
        >
          {saving ? "저장 중..." : "시나리오 저장"}
        </button>
        {slug && (
          <a className="text-blue-600 underline" href={`/s/${slug}`}>
            공유 링크 열기
          </a>
        )}
      </div>
    </div>
  );
}
