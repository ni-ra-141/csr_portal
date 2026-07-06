import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import pool from "@/lib/db";
import { sendOtpEmail } from "@/lib/brevo";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Generate a secure 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    // OTP expires after 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Delete any previous OTP for this email
    await pool.query(
      "DELETE FROM email_otps WHERE email = $1",
      [email]
    );

    // Store the new OTP
    await pool.query(
      `
      INSERT INTO email_otps
      (
        email,
        otp_code,
        expires_at
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      `,
      [email, otp, expiresAt]
    );

    // Send email using Brevo
    await sendOtpEmail(email, otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP.",
      },
      {
        status: 500,
      }
    );
  }
}