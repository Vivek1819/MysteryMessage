import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try{
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each questions should be separated by '||'. These questions are for an anonymous social messaging platform like Qooh.me, and should be sutiable for a diverse audience. Avoid personal and sensitive topics, focusing instead on universal themes that encourage friendly interaction."
  

    const result = await streamText({
    model: openai('gpt-4-turbo'),
    prompt
    });

    return result.toAIStreamResponse();
}catch(error){
  if(error instanceof OpenAI.APIError){
    const {name,status,headers,message}=error
    return NextResponse.json({
      name,status,headers,message
    },{status:status})
  }
  else{
    console.error("An unexpected Error Occurred",error)
    throw error
  }
}
}