import React, { useEffect, useState } from 'react'
import VapiAgent from '../../componets/students/VapiAgent'
import { useLocation } from "react-router-dom";
import { fetchQuestionsFromPdf } from '../../api/studentsApi';

function Interview() {
  const location = useLocation();
  const pdfUrl = location.state?.pdfUrl;
  const [questions, setQuestions] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(()=>{
     const fetchQuestion = async()=>{
        let res =  await fetchQuestionsFromPdf(pdfUrl)        
        setQuestions(res?.data.questions)
     }
     fetchQuestion()
  },[])

  const sendAnswerToBackend = async (data: { question: string; answer: string }) => {
    try {
      // await fetch('/api/students/saveAnswer', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // });
      alert(data.answer)
    } catch (err) {
      console.error("Error sending answer", err);
    }
  };

  const handleUserResponse = async (answer: string) => {
    const qna = { question: questions[currentIndex], answer };
    await sendAnswerToBackend(qna);
    setCurrentIndex(prev => prev + 1);
  };

 


  return ( 
    <div>
    {questions.length === 0 && (
      <div className="w-full h-screen flex justify-center items-center  text-lg text-gray-600 animate-pulse">
        Preparing your interview...
      </div>
    )}
    {questions.length > 0 && currentIndex < questions.length && (
      <VapiAgent
        question={questions[currentIndex]}
        onUserAnswer={handleUserResponse}
      />
    )}
    {questions.length > 0 && currentIndex >= questions.length && (
      <div className="text-center mt-10 text-xl">Interview completed. Thank you!</div>
    )}
  </div>
  )
}

export default Interview
