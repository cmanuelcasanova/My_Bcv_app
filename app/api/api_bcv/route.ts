import { NextResponse } from 'next/server';
import { Api_Bcv } from "@/app/types/api_bcv"
import axios from 'axios';

export async function GET() {

  try {
    const response = await axios.get<Api_Bcv>('https://api.dolarvzla.com/public/exchange-rate',

      {
        headers: {

          'Accept': 'application/json',
          'Content-Type': 'application/json',

          'x-dolarvzla-key':  `${process.env.NEXT_PUBLIC_API_BCV}`
        }

      }


    );
    
    return NextResponse.json({status: 200 , data :response.data});
  } catch (error) {
    
    return NextResponse.json({status: 401 , data : {}});
  }





}