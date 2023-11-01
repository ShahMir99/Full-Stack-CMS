import Prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const body = await req.json();
    const { name, value } = body;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("unauthenticated", { status: 400 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUser = await Prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const size = await Prisma.size.create({
      data: {
        storeId: params.storeId,
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
