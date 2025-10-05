import { api } from "@/utills/api";

export async function POST(req) {
  try {
    const messages = await req.json(); 

   
    const res = await api(messages);

   
    const songsString = res?.data?.choices?.[0]?.message?.content;

    if (!songsString) {
      throw new Error("Failed to generate music data from the AI response.");
    }
    
   
    return new Response(JSON.stringify({ songsString }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (err) {
    console.error("[GEN-MUSIC-API-ERROR]", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}