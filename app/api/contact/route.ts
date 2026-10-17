import { NextRequest, NextResponse } from "next/server";

const allowedCustomers = ["privat", "senior", "foretag"];
const allowedServices = [
  "general",
  "mac",
  "wifi",
  "network-cable",
  "unifi-camera",
  "email",
  "microsoft365",
  "security",
  "device",
  "other",
];
const allowedModes = ["hembesok", "distans"];

function isAllowed(value: unknown, values: string[]) {
  return typeof value === "string" && values.includes(value);
}

function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;

  const text = value.trim();

  if (text.length > maxLength) return null;

  return text;
}

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}


async function readLimitedBody(
  request: NextRequest,
  maxBytes: number
): Promise<string | null> {
  const reader = request.body?.getReader();

  if (!reader) return "";

  const decoder = new TextDecoder("utf-8", { fatal: true });
  let totalBytes = 0;
  let result = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;

      if (totalBytes > maxBytes) {
        await reader.cancel();
        return null;
      }

      result += decoder.decode(value, { stream: true });
    }

    result += decoder.decode();
    return result;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().startsWith("application/json")) {
      return errorResponse("Ogiltigt format på förfrågan.", 415);
    }

    const contentLength = Number(
      request.headers.get("content-length") ?? 0
    );

    if (
      !Number.isFinite(contentLength) ||
      contentLength > 16384
    ) {
      return errorResponse("Förfrågan är för stor.", 413);
    }

    const rawBody = await readLimitedBody(request, 16384);

    if (rawBody === null) {
      return errorResponse("F?rfr?gan ?r f?r stor.", 413);
    }

    let data: unknown;

    try {
      data = JSON.parse(rawBody);
    } catch {
      return errorResponse("Ogiltiga uppgifter i förfrågan.");
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return errorResponse("Ogiltiga uppgifter i förfrågan.");
    }

    const body = data as Record<string, unknown>;

    if (
      typeof body.website !== "undefined" &&
      (typeof body.website !== "string" ||
        body.website.trim() !== "")
    ) {
      return NextResponse.json(
        { error: "Förfrågan kunde inte behandlas." },
        { status: 400 }
      );
    }

    if (!isAllowed(body.customerType, allowedCustomers)) {
      return errorResponse("Välj en giltig kundtyp.");
    }

    if (!isAllowed(body.service, allowedServices)) {
      return errorResponse("Välj en giltig tjänst.");
    }

    if (!isAllowed(body.supportMode, allowedModes)) {
      return errorResponse("Välj en giltig supportform.");
    }

    const name = readText(body.name, 120);
    const email = readText(body.email, 254);
    const phone = readText(body.phone, 40);
    const message = readText(body.message, 3000);

    if (!name || !email || !phone || !message) {
      return errorResponse(
        "Fyll i namn, e-post, telefonnummer och meddelande."
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorResponse("Ange en giltig e-postadress.");
    }

    const company = readText(body.company, 150);
    const organisationNumber = readText(
      body.organisationNumber,
      30
    );

    if (
      body.customerType === "foretag" &&
      (!company || !organisationNumber)
    ) {
      return errorResponse(
        "Fyll i företagsnamn och organisationsnummer."
      );
    }

    const address = readText(body.address, 200);
    const postcode = readText(body.postcode, 20);
    const city = readText(body.city, 100);

    if (
      body.supportMode === "hembesok" &&
      (!address || !postcode || !city)
    ) {
      return errorResponse(
        "Fyll i adress, postnummer och ort för besök."
      );
    }

    return errorResponse(
      "Förfrågningar kan inte skickas ännu. Försök igen senare.",
      503
    );
  } catch {
    return errorResponse(
      "Vi kunde inte behandla förfrågan. Försök igen senare.",
      500
    );
  }
}
