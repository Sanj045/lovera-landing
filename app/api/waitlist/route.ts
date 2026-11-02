import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, interested } = body;

        // 1. Kiểm tra dữ liệu đầu vào
        if (!name || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // 2. Lấy URL Google Script từ file .env.local
        const googleSheetUrl = process.env.GOOGLE_SHEET_URL;

        if (!googleSheetUrl) {
            console.error("Missing GOOGLE_SHEET_URL in .env.local");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // 3. Gửi dữ liệu sang Google Sheets
        const response = await fetch(googleSheetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, interested }),
        });

        if (!response.ok) {
            throw new Error("Failed to send data to Google Sheets");
        }

        console.log("✅ Đã lưu thành công vào Google Sheets:", { name, email, interested });

        return NextResponse.json({ ok: true, message: "Signup successful" });
    } catch (error) {
        console.error("Lỗi API Waitlist:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}