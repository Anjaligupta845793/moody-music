import { api } from "@/utills/api";

export async function POST(req) {
  try {
    const messages = await req.json();

    const res = await api(messages);

    const assistantMessage = res?.data?.choices?.[0]?.message;

    if (!assistantMessage) {
      throw new Error("Failed to extract a valid message from the AI response.");
    }

    return new Response(JSON.stringify({ assistantMessage }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error("[API_ROUTE_ERROR]", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}