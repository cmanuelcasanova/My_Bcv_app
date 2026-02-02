import {NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { BinanceP2PResponse } from '@/app/types/api_bcv'

export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url);
  const monto_minimo = searchParams.get('monto_minimo') || "0";

  try {
   const response_Sell = await axios.post<BinanceP2PResponse>(
  'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  {
    asset: "USDT",
    fiat: "VES",
    merchantCheck: true,
    page: 1,               
    rows: 10,
    payTypes: [],          
    publisherType: "merchant", 
    transAmount: monto_minimo,
    tradeType: 'SELL' 
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  }
);

const response_Buy = await axios.post<BinanceP2PResponse>(
  'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  {
    asset: "USDT",
    fiat: "VES",
    merchantCheck: true,
    page: 1,               
    rows: 10,
    payTypes: [],          
    publisherType: "merchant", 
    transAmount: monto_minimo,
    tradeType: 'BUY' 
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  }
);


    return NextResponse.json({status: 200 , Compra :response_Buy.data.data, Venta: response_Sell.data.data });
  } catch (error) {
  
    return NextResponse.json({status: 401 , data : {}});
  }





}