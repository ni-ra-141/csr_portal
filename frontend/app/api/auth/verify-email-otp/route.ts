import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await pool.query(
      `
      SELECT *
      FROM email_otps
      WHERE email = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No OTP found.",
        },
        {
          status: 404,
        }
      );
    }

    const otpRecord = result.rows[0];

    // Check expiry
    // Check expiry
    if (new Date() > otpRecord.expires_at) {

    // Delete expired OTP
    await pool.query(
        `
        DELETE FROM email_otps
        WHERE id = $1
        `,
        [otpRecord.id]
    );

    return NextResponse.json(
        {
        success: false,
        message: "OTP has expired.",
        },
        {
        status: 400,
        }
    );
    }

    // Check OTP
    if (otpRecord.otp_code !== otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP.",
        },
        {
          status: 400,
        }
      );
    }

    // Delete OTP after successful verification
    // Mark OTP as verified
  await pool.query(
    `
    UPDATE email_otps
    SET is_verified = TRUE
    WHERE id = $1
    `,
    [otpRecord.id]
  );

  return NextResponse.json({
    success: true,
    message: "Email verified successfully.",
  });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}