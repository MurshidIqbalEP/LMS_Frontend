import { useEffect, useState } from "react";
import { startAssistant } from "../../services/voiceAgent";
import  Vapi  from '@vapi-ai/web'
export const vapi = new Vapi(import.meta.env.VITE_VAPI_KEY);

interface Props {
  question: string;
  onUserAnswer: (answer: string) => void;
}

const VapiAgent: React.FC<Props> = ({ question, onUserAnswer }) => {

  useEffect(() => {
    vapi.start({
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your  interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: `+question+`
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty ✍️
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on React
        `.trim(),
          },
        ],
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      name: "My Inline Assistant",
    
    });
    

  }, [question]);

  return (
    <div className='w-full h-screen bg-gray-300 opacity-50 flex gap-12 justify-center items-center'>
        <div className='w-[500px] h-[400px] bg-amber-500 rounded-2xl border-4 border-black flex flex-col justify-center items-center'>
                <div className='w-[50%] h-[50%] bg-amber-900 overflow-hidden rounded-full'>
                <img src="card2.jpg" alt="image" className=' w-full h-full object-cover' />
                </div>
                <h1 className='mt-2'>Aura AI</h1>
                  
        </div>
        <div className='w-[500px] h-[400px] bg-amber-500 rounded-2xl border-4 border-black flex flex-col justify-center items-center'>
                <div className='w-[50%] h-[50%] bg-amber-900 overflow-hidden rounded-full'>
                <img src="card2.jpg" alt="image" className=' w-full h-full object-cover' />
                </div>
                  <h1>User</h1>
        </div>
    </div>
  )
}

export default VapiAgent