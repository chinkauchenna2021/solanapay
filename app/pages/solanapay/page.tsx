'use client'

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { createQR } from '@solana/pay';
import axios from 'axios'
import Link  from 'next/link'


export default function Page() {
    const [qrCode, setQrCode] = useState<string>();
    const [reference, setReference] = useState<string>();

    const handleGenerateClick = async () => {
        // 1 - Send a POST request to our backend and log the response URL
        const res = await axios.post('https://solanapay.onrender.com/api/solanapay');
        console.log(res)
        const { url, ref } = await res.data;
        // console.log(url)
        // 2 - Generate a QR Code from the URL and generate a blob
        const qr = createQR(url);
        const qrBlob = await qr.getRawData('png');
        if (!qrBlob) return;
        // 3 - Convert the blob to a base64 string (using FileReader) and set the QR code state
        const reader = new FileReader();
        reader.onload = (event) => {
          if (typeof event.target?.result === 'string') {
            setQrCode(event.target.result);
          }
        };
        reader.readAsDataURL(qrBlob);
        // 4 - Set the reference state
        setReference(ref);
      };

  const handleVerifyClick = async () => {
    // 1 - Check if the reference is set
    if (!reference) {
      alert('Please generate a payment order first');
      return;
    }
    // 2 - Send a GET request to our backend and return the response status
    const res = await axios.get(`https://solanapay.onrender.com/api/solanapay?reference=${reference}`);
    const { status } = await res.data;

    // 3 - Alert the user if the transaction was verified or not and reset the QR code and reference
    if (status === 'verified') {
      alert('Transaction verified');
      setQrCode(undefined);
      setReference(undefined);
    } else {
      alert('Transaction not found');
    }
  };

  return (
    <>
      <Head>
        <title>Bluedill Solana Pay Demo</title>
        <meta name="description" content="QuickNode Guide: Solana Pay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className='text-sm font-semibold'>Bluedill Solana Pay Demo</h1>
            <div className='text-sm text-pink-900 font-semibold cursor-pointer bg-pink-100 px-4 py-2 rounded-sm'><Link href={'/pages/airdrop/'}>Get Airdrop</Link></div>
            <div className='text-sm text-pink-900 font-semibold cursor-pointer bg-pink-100 px-4 py-2 rounded-sm'><Link href={'/pages/ramp/'}>Buy From Ramp</Link></div>  
        </div>
        {qrCode? (
          <Image
            src={qrCode}
            style={{ position: "relative", background: "white" }}
            alt="QR Code"
            width={200}
            height={200}
            priority
          />
        ) :

         (<div  className='text-sm text-pink-900 font-semibold cursor-pointer  px-4 py-2 rounded-sm'>No Payment Code Generated</div>)
    }
        <div>
          <button
            className='text-sm text-pink-900 font-semibold cursor-pointer bg-pink-100 px-4 py-2 rounded-sm'
            style={{ cursor: 'pointer', padding: '10px', marginRight: '10px' }}
            onClick={handleGenerateClick}
          >
            Generate Solana Pay Order
          </button>
          {reference && <button
          className='mx-4 text-sm text-pink-900 font-semibold cursor-pointer bg-pink-100 px-4 py-2 rounded-sm'
            style={{ cursor: 'pointer', padding: '10px' }}
            onClick={handleVerifyClick}
          >
            Verify Transaction
          </button>}
        </div>
      </main>
    </>
  );
}