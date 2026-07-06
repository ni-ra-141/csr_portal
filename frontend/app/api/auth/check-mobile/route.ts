import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { mobile } = await req.json();

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await pool.query(
      "SELECT id FROM students WHERE mobile = $1",
      [mobile]
    );

    return NextResponse.json({
      success: true,
      exists: result.rows.length > 0,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}