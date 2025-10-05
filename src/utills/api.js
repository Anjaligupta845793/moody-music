
import axios from "axios"
export const api = async(prompt) => {
    
  
    try {
        const res = await axios.post(
      "https://api.cerebras.ai/v1/chat/completions",
      {
        model: "llama-4-scout-17b-16e-instruct", // or another model
        messages: prompt,
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )
    return res
    } catch (error) {
        console.log(error)
    }
  
}


