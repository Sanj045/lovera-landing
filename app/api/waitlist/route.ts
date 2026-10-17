import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, interested } = body;

        // Validate cơ bản
        if (!name || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // TODO: Lưu vào database (Supabase, Google Sheets, MongoDB...) sau này
        // Hiện tại chỉ log ra terminal server để test
        console.log("====================================");
        console.log("NEW WAITLIST SIGNUP:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Interested:", interested);
        console.log("Time:", new Date().toISOString());
        console.log("====================================");

        return NextResponse.json({ ok: true, message: "Signup successful" });
    } catch (error) {
        console.error("Waitlist API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}