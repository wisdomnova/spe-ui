import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      department,
      is_spe_member,
      is_membership_active,
      whatsapp_number,
      event_name,
    } = body;

    // Basic Validations
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    if (!department || typeof department !== "string" || !department.trim()) {
      return NextResponse.json({ error: "Department is required" }, { status: 400 });
    }

    if (typeof is_spe_member !== "boolean") {
      return NextResponse.json({ error: "SPE membership selection is required" }, { status: 400 });
    }

    if (is_spe_member) {
      if (typeof is_membership_active !== "boolean") {
        return NextResponse.json({ error: "Please specify if your membership is active" }, { status: 400 });
      }
    } else {
      if (!whatsapp_number || typeof whatsapp_number !== "string" || !whatsapp_number.trim()) {
        return NextResponse.json({ error: "WhatsApp number is required for waitlist" }, { status: 400 });
      }
    }

    const { data, error } = await supabase
      .from("event_registrations")
      .insert({
        event_name: event_name || "Industry Week '26",
        name: name.trim(),
        email: email.trim().toLowerCase(),
        department: department.trim(),
        is_spe_member,
        is_membership_active: is_spe_member ? is_membership_active : null,
        whatsapp_number: is_spe_member ? null : whatsapp_number.trim(),
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}
