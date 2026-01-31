import { NextResponse } from 'next/server';
import { Api_Bcv } from "@/app/types/api_bcv"
import axios from 'axios';

export async function GET() {

  try {
    const response = await axios.get<Api_Bcv>('https://api.dolarvzla.com/public/exchange-rate',

      {
       headers: {
        'Referer': 'https://www.dolarvzla.com/',
        'Origin': 'https://www.dolarvzla.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      
      params: {
        t: new Date().getTime() 
      }

          //'x-dolarvzla-key':  `${process.env.NEXT_PUBLIC_API_BCV}`
        

      }


    );
    
    return NextResponse.json({status: 200 , data :response.data});
  } catch (error) {
    
    return NextResponse.json({status: 401 , data : {}});
  }





}