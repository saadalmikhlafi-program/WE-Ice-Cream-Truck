import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany({
    select: { title: true, featuredImage: true, slug: true }
  });
  return NextResponse.json(posts);
}
