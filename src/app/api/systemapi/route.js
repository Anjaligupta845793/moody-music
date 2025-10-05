import { api } from "@/utills/api";




export async function POST(req) {
  try {
    const { prompt} = await req.json();
    const res = await api([{ role: "system", content: prompt }]);
    const content = res?.data.choices?.[0]?.message.content;
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
