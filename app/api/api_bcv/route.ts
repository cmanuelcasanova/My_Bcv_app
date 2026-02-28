import { NextResponse } from 'next/server';
import { Api_Bcv } from "@/app/types/api_bcv"
import axios from 'axios';
import https from 'https';
import * as cheerio from 'cheerio';


export const revalidate = 60;

const userAgents = [
  // --- MÓVILES (iOS) ---
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',

  // --- MÓVILES (Android) ---
  'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 13; Motorola Edge 40) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 14; Xiaomi 13T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',

  // --- WINDOWS (Varios Navegadores) ---
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.2365.80',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko', // Internet Explorer 11 (para sitios muy viejos)

  // --- MACOS ---
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',

  // --- LINUX ---
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0',];


const URL = 'https://www.bcv.org.ve/'
const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];

const agent = new https.Agent({  
  rejectUnauthorized: false 
});

export async function GET() {

try {
 
  const { data } = await axios.get(URL, {
  headers: { 
    'User-Agent': randomUA, 
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
    'DNT': '1',
  },
  httpsAgent: agent,
  timeout: 10000
  

  });
  const $ = cheerio.load(data);
  
  const dolar =  
  $('#dolar')
  .find('div:first-of-type').eq(1) 
  .find('div:nth-of-type(2)')     
  .find('strong')                
  .text().trim()

   const euro = $('#euro')
  .find('div:first-of-type').eq(1) 
  .find('div:nth-of-type(2)')     
  .find('strong')                
  .text().trim()

  const fecha = $('.date-display-single').first().text().trim()

  

 
 
 

  if( dolar && euro && fecha) {
    
     const myScrapt:Api_Bcv = {
  current: { usd: Number(parseFloat(dolar.replace(',', '.')).toFixed(2)), eur: Number(parseFloat(euro.replace(',', '.')).toFixed(2)), date: fecha},
  previous: { usd: 0, eur: 0, date: ''},
  changePercentage: { usd: 0, eur: 0 }}


    return NextResponse.json({status: 200 , data : myScrapt , api: 1});
 
     }

    }catch {

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
    
    return NextResponse.json({status: 200 , data :response.data , api: 2});
  } catch (error) {
    
    return NextResponse.json({status: 401 , data : {}, api: 0});
  }

}




}