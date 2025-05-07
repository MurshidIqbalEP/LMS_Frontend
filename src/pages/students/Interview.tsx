import React, { useEffect, useState } from 'react'
import VapiAgent from '../../componets/students/VapiAgent'
import { useLocation } from "react-router-dom";
import { fetchQuestionsFromPdf } from '../../api/studentsApi';

function Interview() {
  const location = useLocation();
  const pdfUrl = location.state?.pdfUrl;
  const [questions, setQuestions] = useState<string[]>([])


  useEffect(()=>{
     const fetchQuestion = async()=>{
        let res =  await fetchQuestionsFromPdf(pdfUrl)         
        setQuestions(res?.data.questions)
     }
     fetchQuestion()
  },[])

  return ( 
    <div>
    {questions.length === 0 && (
      <div className="w-full h-screen flex justify-center items-center  text-lg text-gray-600 animate-pulse">
        Preparing your interview...
      </div>
    )}
    {questions.length > 0  && (
      <VapiAgent
        questions={questions}
      />
    )}
  </div>
  )
}

export default Interview
