import { useEffect, useState } from "react";
import { startAssistant } from "../../services/voiceAgent";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import Lottie from "lottie-react";
import speakingWave from "../../assets/talking animation.json";

export const vapi = new Vapi(import.meta.env.VITE_VAPI_KEY);

interface Props {
  question: string;
  onUserAnswer: (answer: string) => void;
}

const VapiAgent: React.FC<Props> = ({ question, onUserAnswer }) => {
  const [interviewStatus, setInterviewStatus] = useState<"preparing" | "started" | "ended">("preparing");
  const [aiText, setAiText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiSpeaking, setAispeeking] = useState(false);

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
                  You are an AI voice assistant responsible for conducting spoken job interviews.
                  Start the conversation with a warm, friendly introduction to make the candidate feel comfortable. For example:
                  "Hey there! Welcome to your interview. Let’s get started with a few questions!"
                   You will be given a list of interview questions. Ask one question at a time and wait for the candidate to finish their response before moving to the next.
                   Here are the questions you will ask:${question}`,
          },
        ],
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      name: "My Inline Assistant",
    });

    vapi.on("message", (message) => {
      console.log(message);
      
      if (
        message.type == "transcript" &&
        message.role == "assistant" &&
        message.transcriptType == "final"
      ) {
        setAiText(message.transcript);
      }

      if ( message.type == "transcript" &&
        message.role == "user" &&
        message.transcriptType == "partial") {
          setIsSpeaking(true)
      }else{
        setIsSpeaking(false)
      }
    });

    vapi.on("speech-start", () => {
      setAispeeking(true);
    });

    vapi.on("speech-end", () => {
      setAispeeking(false);
    });

    vapi.on("call-start", () => {
      setInterviewStatus("started");
      toast.message("call started..................");
    });

    vapi.on("call-end", () => {
      setInterviewStatus("ended");
      console.log("Call has ended.");
    });

    return () => {
      vapi.stop();
      vapi.off("message", () => {
        console.log("end");
      });
    };
  }, [question]);

  const handleCallStart = () => {
    alert("saaaaaaaaaaaaaaa")
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
                  You are an AI voice assistant responsible for conducting spoken job interviews.
                  Start the conversation with a warm, friendly introduction to make the candidate feel comfortable. For example:
                  "Hey there! Welcome to your interview. Let’s get started with a few questions!"
                   You will be given a list of interview questions. Ask one question at a time and wait for the candidate to finish their response before moving to the next.
                   Here are the questions you will ask:${question}`,
          },
        ],
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      name: "My Inline Assistant",
    });
  };

  const handleEndCall = () => {
    vapi.stop();
    setIsSpeaking(false);
    setInterviewStatus("ended");
    setAiText("Call ended. Thank you!");
  };

  return (
    <>
    {interviewStatus === "preparing" && (
      <div className="w-full h-screen flex justify-center items-center text-lg text-gray-600 animate-pulse">
        Preparing your interview...
      </div>
    )}
  
    {interviewStatus === "started" && (
      <div className="w-full h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center px-4 py-8">
        <div className="flex flex-wrap justify-center items-center gap-10 mb-8">
          {/* AI Assistant Card */}
          <div className="relative w-[300px] h-[350px] bg-white rounded-3xl shadow-lg border-4 border-amber-600 flex flex-col justify-center items-center">
            <div className="relative w-full h-full mb-4 flex items-center justify-center">
              {aiSpeaking && (
                <Lottie
                  animationData={speakingWave}
                  loop
                  autoplay
                  className="absolute w-70 h-70 z-0"
                />
              )}
              <img
                src="card2.jpg"
                alt="AI Avatar"
                className="w-40 h-40 rounded-full object-cover z-10"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Aura AI</h2>
          </div>
  
          {/* User Card */}
          <div className="relative w-[300px] h-[350px] bg-white rounded-3xl shadow-lg border-4 border-amber-600 flex flex-col justify-center items-center">
            <div className="relative w-full h-full mb-4 flex items-center justify-center">
              {isSpeaking && (
                <Lottie
                  animationData={speakingWave}
                  loop
                  autoplay
                  className="absolute w-70 h-70 z-0"
                />
              )}
              <img
                src="card2.jpg"
                alt="User Avatar"
                className="w-40 h-40 rounded-full object-cover z-10"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-800">User</h2>
          </div>
        </div>
  
        {/* AI Text Display */}
        <div className="bg-white px-6 py-4 rounded-xl shadow border max-w-xl text-center text-gray-700 text-lg mb-4">
          {aiText}
        </div>
  
        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 transition"
        >
          End Call
        </button>
      </div>
    )}
  
    {interviewStatus === "ended" && (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-gray-700 text-center px-4">
        <h1 className="text-2xl font-semibold mb-4">Interview Ended</h1>
        <p className="text-lg mb-6">Thank you for participating!</p>
        <button
          onClick={() => setInterviewStatus("preparing")}
          className="bg-amber-600 text-white px-5 py-2 rounded-lg shadow hover:bg-amber-700 transition"
        >
          Start Again
        </button>
      </div>
    )}
  </>
  
  );  
};

export default VapiAgent;
