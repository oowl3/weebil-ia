import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "GET Scaner endpoint activo",
  });
}

export async function POST() {
  return NextResponse.json({
    message: "POST Scaner endpoint activo",
  });
}
