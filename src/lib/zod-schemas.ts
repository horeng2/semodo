import { z } from "zod";

// 복리 계산기 입력 값: 클라/서버에서 동일 검증
export const CompoundInputSchema = z.object({
  principal: z.number().min(0), // 원금
  rate: z.number().min(0), // 연이율(%)
  years: z.number().min(0), // 기간(년)
  n: z.number().min(1).default(12), // 복리 주기(연 n회)
  monthly: z.number().min(0).default(0), // 매월 추가 납입액
});

export type CompoundInput = z.infer<typeof CompoundInputSchema>;

export const ScenarioCreateSchema = z.object({
  title: z.string().min(1).max(100),
  tool: z.literal("compound"),
  data: CompoundInputSchema,
});
