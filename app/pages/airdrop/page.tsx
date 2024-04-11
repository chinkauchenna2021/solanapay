'use client'

import React  , {useState} from "react";
import Link from 'next/link'
import  { Connection, clusterApiUrl , Keypair, LAMPORTS_PER_SOL , PublicKey } from '@solana/web3.js';
import { ToastContainer, toast } from 'react-toastify';


const quicknodeEndpoint = 'https://api.devnet.solana.com'; // Replace with your QuickNode endpoint

export default function Page(){
    const [getAddress , setAddress] = useState("")
    const [getAmount , setAmount] = useState(0)
    // Connect to the devnet cluster
    const connection = new Connection(quicknodeEndpoint, 'confirmed');
  
const getAirdrop =  async()=>{
    if(!getAddress  || !getAmount )return;
    const recipientPublicKey = new PublicKey(getAddress);
    const lamports = LAMPORTS_PER_SOL * getAmount // 1 SOL = 1,000,000,000 lamports
      connection.requestAirdrop(recipientPublicKey, lamports).then(transactionSignature => {
        const link = "https://solscan.io/account/"+getAddress;
     toast(`${getAmount} SOL have been sent to your address  ${<a href={link}>{"check on solscan"}</a>}`);
        console.log('Airdrop transaction successful:', transactionSignature);
    }).catch(error => {
        console.error('Airdrop transaction failed:', error);
    });
}


  return(
    <div className="container  w-full  flex justify-center mt-10">
        <div className="w-full lg:w-3/6 border-1 border-gray-50  py-3 space-y-7 ">
              <div className="w-full flex justify-between ">
                <span className="w-fit text-center text-2xl font-bold tracking-wide text-green-600">Bluedill Solana Airdrop</span>
                <span className="w-fit text-center text-sm font-bold tracking-wide text-green-600 w-fit py-2 px-3 bg-green-100 text-green-900 rounded-sm"><Link href={'/pages/solanapay/'}>Back</Link></span>        
              </div>
              <div className="w-full flex flex-col space-y-3">
                  <input onChange={(e)=>setAddress(e.target.value)} className="w-full h-8 outline-none border text-sm pl-3" type="text" placeholder="Enter Wallet Address" />
                  <input  onChange={(e)=>setAmount(Number(e.target.value))} className="w-full h-8 outline-none border text-sm pl-3" type="text"  placeholder="Enter Sol Amount"/>
                 <button onClick={getAirdrop} className="border-none h-8 w-full bg-green-50 text-green-900 ">Claim</button>
              </div>  
        </div>
        <ToastContainer />
    </div>
  );
}