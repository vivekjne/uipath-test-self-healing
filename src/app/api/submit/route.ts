import { NextResponse } from "next/server";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fName, lastName, email, job } = data;

    const errors: Record<string, string> = {};

    if (!fName?.trim()) errors.fName = "First name is required.";
    if (!lastName?.trim()) errors.lastName = "Last name is required.";
    if (!email?.trim()) errors.email = "Email is required.";
    else if (!isEmail(email)) errors.email = "Email is invalid.";
    if (!job?.trim()) errors.job = "Job title is required.";

    if (Object.keys(errors).length)
      return NextResponse.json({ ok: false, errors }, { status: 400 });

    console.log("✅ Form submission:", { fName, lastName, email, job });

    return NextResponse.json({
      ok: true,
      message: "Form submitted successfully!",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
