import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, style, timestamp } = body

    // Validate input
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Save to database (Supabase, Neon, etc.)
    // 2. Add to email marketing service (ConvertKit, Mailchimp, etc.)
    // 3. Send confirmation email
    // 4. Log analytics event

    console.log("Waitlist submission:", {
      email,
      style,
      timestamp,
      userAgent: request.headers.get("user-agent"),
      ip: request.ip || request.headers.get("x-forwarded-for"),
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist",
      data: {
        email,
        style,
        position: Math.floor(Math.random() * 500) + 1, // Mock waitlist position
      },
    })
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
