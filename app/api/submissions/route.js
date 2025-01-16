import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Get the session token from the request headers
    const headersList = headers();
    const token = await getToken({
      req: {
        headers: Object.fromEntries(headersList.entries()),
        cookies: headersList.get('cookie'),
      },
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, country, company, questions } = body;

    if (!name || !country || !company || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        name,
        country,
        company,
        questions,
        userId: token.id,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const submissions = await prisma.submission.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const total = await prisma.submission.count();

    return NextResponse.json({
      submissions,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    });
  } catch (error) {
    console.error("Fetch submissions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}