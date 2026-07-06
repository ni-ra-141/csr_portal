import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const client = await pool.connect();

  try {
    const {
      teamName,
      college,
      region,
      leaderName,
      leaderEmail,
      leaderMobile,
      members,
    } = await req.json();

    // Validate required fields
    if (
      !teamName ||
      !college ||
      !region ||
      !leaderName ||
      !leaderEmail ||
      !leaderMobile
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // Check if email has been verified
    const verified = await client.query(
      `
      SELECT id
      FROM email_otps
      WHERE email = $1
      AND is_verified = TRUE
      LIMIT 1
      `,
      [leaderEmail]
    );

    if (verified.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email first.",
        },
        {
          status: 400,
        }
      );
    }

    // Duplicate leader email
    const emailExists = await client.query(
      `
      SELECT id
      FROM students
      WHERE email = $1
      `,
      [leaderEmail]
    );

    if (emailExists.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Leader email is already registered.",
        },
        {
          status: 400,
        }
      );
    }

    // Duplicate leader mobile
    const mobileExists = await client.query(
      `
      SELECT id
      FROM students
      WHERE mobile = $1
      `,
      [leaderMobile]
    );

    if (mobileExists.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Leader mobile number is already registered.",
        },
        {
          status: 400,
        }
      );
    }

    // Begin transaction
    await client.query("BEGIN");

    // Create team
    const teamResult = await client.query(
      `
      INSERT INTO teams (
        team_name,
        college_name,
        region
      )
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [teamName, college, region]
    );

    const teamId = teamResult.rows[0].id;

    // Insert leader
    await client.query(
      `
      INSERT INTO students (
        team_id,
        full_name,
        email,
        mobile,
        region,
        is_leader
      )
      VALUES ($1, $2, $3, $4, $5, TRUE)
      `,
      [
        teamId,
        leaderName,
        leaderEmail,
        leaderMobile,
        region,
      ]
    );

    // Insert members
    if (Array.isArray(members)) {
      for (const member of members) {
        if (
          !member.name ||
          !member.email ||
          !member.mobile
        ) {
          continue;
        }

        await client.query(
          `
          INSERT INTO students (
            team_id,
            full_name,
            email,
            mobile,
            region,
            is_leader
          )
          VALUES ($1, $2, $3, $4, $5, FALSE)
          `,
          [
            teamId,
            member.name,
            member.email,
            member.mobile,
            region,
          ]
        );
      }
    }

    // Remove verification record
    await client.query(
      `
      DELETE FROM email_otps
      WHERE email = $1
      `,
      [leaderEmail]
    );

    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      message: "Team registered successfully.",
    });

  } catch (error) {

    await client.query("ROLLBACK");

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

  } finally {

    client.release();

  }
}