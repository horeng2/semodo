import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ScenarioCreateSchema } from "@/lib/zod-schemas";
import { randomBytes } from "crypto";

export async function GET() {
  const items = await prisma.scenario.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = ScenarioCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const slug = randomBytes(6).toString("base64url");
  const created = await prisma.scenario.create({
    data: {
      title: parsed.data.title,
      tool: parsed.data.tool,
      data: parsed.data.data,
      publicSlug: slug,
    },
  });
  return NextResponse.json({ id: created.id, publicSlug: slug });
}
