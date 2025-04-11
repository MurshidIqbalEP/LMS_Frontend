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
        console.log(JSON.parse(res?.data.questions.replace(/\\/g, '')));
        
        setQuestions(JSON.parse(res?.data.questions.replace(/\\/g, '')))
     }
     fetchQuestion()
  },[])


  return ( 
    <div>
       <h1>Ai Assesment</h1>
       {questions?.map((q, idx) => (
   <h1 key={idx}>{q}</h1>
))}
       <VapiAgent />
    </div>
  )
}

export default Interview
