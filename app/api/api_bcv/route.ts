import { NextResponse } from 'next/server';
import { Api_Bcv } from "@/app/types/api_bcv"
import axios from 'axios';



export async function GET() {

 try {
  const response = await axios.get<Api_Bcv>('https://api.dolarvzla.com/public/exchange-rate');
  console.log(response.data);
  return NextResponse.json(response.data);
} catch (error) {
  console.error(error);
    return NextResponse.json({});
}

 
    


}