import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "password123";

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    token: "demo-admin-token",
    user: {
      email: adminEmail,
      role: "admin",
    },
  });
}
