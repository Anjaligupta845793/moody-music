import axios from "axios";


export async function api(messages) {
 
  const payload = {
    model: "llama-4-scout-17b-16e-instruct", 
    messages: messages,      
    temperature: 0.7,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.CEREBRAS_API_KEY}`,
    },
  };

  try {
   
    const res = await axios.post(
      "https://api.cerebras.ai/v1/chat/completions",
      payload,
      config
    );
    return res;

  } catch (error) {
       if (error.response) {
      console.error("Axios request to Cerebras API failed:");
      console.error(`Status Code: ${error.response.status}`);
      console.error("Response Body:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error setting up the request to Cerebras API:", error.message);
    }
   
    throw error;
  }
}