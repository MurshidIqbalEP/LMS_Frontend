import  Vapi  from '@vapi-ai/web'

export const vapi = new Vapi(import.meta.env.VITE_VAPI_KEY);

export const startAssistant = async ()=>{
   return vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID)
}

export const stopeAssistant = async ()=>{
    return vapi.stop()
 }