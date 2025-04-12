import { useEffect, useState } from "react";
import { startAssistant } from "../../services/voiceAgent";

interface Props {
  question: string;
  onUserAnswer: (answer: string) => void;
}

const VapiAgent: React.FC<Props> = ({ question, onUserAnswer }) => {

  useEffect(() => {
    console.log(startAssistant);
    
    startAssistant()
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