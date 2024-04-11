import { NextRequest, NextResponse  } from 'next/server';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { encodeURL, findReference, validateTransfer } from '@solana/pay';
// @ts-ignore
import BigNumber from 'bignumber.js';



// CONSTANTS
const myWallet = 'HSx8tfdzQFQCyhd69697VyoPirAgdYoSdTP49YYgBAiK'; // Replace with your wallet address (this is the destination where the payment will be sent)
const recipient = new PublicKey(myWallet);
const amount = new BigNumber(0.0001); // 0.0001 SOL
const label = 'Bluedil Pay';
const memo = 'Bluedil Sol Devnet Pay';
const quicknodeEndpoint = 'https://api.devnet.solana.com'; // Replace with your QuickNode endpoint

const paymentRequests = new Map<string, { recipient: PublicKey; amount: BigNumber; memo: string }>();

export async function GET(req:NextRequest){
   const reference =  req.nextUrl.searchParams.get("reference") 
   console.log(reference)
       if (!reference) {
       return NextResponse.json({ error: 'Missing reference query parameter' });
    }

     // 2 - Verify the transaction
    try {
      const referencePublicKey = new PublicKey(reference as string);
      const response = await verifyTransaction(referencePublicKey);
      if (response) {
         return NextResponse.json({ status: 'verified' } , {status: 200});
      } else {
         return NextResponse.json({ status: 'not found' } , {status: 404});
      }
    } catch (error) {
      console.error('Error:', error);
       return NextResponse.json({ error: 'Internal Server Error' } , {status: 500});
    }
}


export async function POST(req:NextRequest) {
    try {
        const reference = new Keypair().publicKey;
        const message = `Bluedill - Payment ID #0${Math.floor(Math.random() * 999999) + 1}`;
        const urlData = await generateUrl(
          recipient,
          amount,
          reference,
          label,
          message,
          memo
        );
        const ref = reference.toBase58();
        paymentRequests.set(ref, { recipient, amount, memo });
        const { url } = urlData;
       return NextResponse.json({ url: url.toString(), ref });
      } catch (error) {
        console.error('Error:', error);
       return  NextResponse.json({ error: 'Internal Server Error' });
      }
}

async function generateUrl(
    recipient: PublicKey,
    amount: BigNumber,
    reference: PublicKey,
    label: string,
    message: string,
    memo: string,
  ) {
    const url: URL = encodeURL({
      recipient,
      amount,
      reference,
      label,
      message,
      memo,
    });
    return { url };
  }


  async function verifyTransaction(reference: PublicKey) {
    // 1 - Check that the payment request exists
    const paymentData = paymentRequests.get(reference.toBase58());
    if (!paymentData) {
      throw new Error('Payment request not found');
    }
    const { recipient, amount, memo } = paymentData;
    // 2 - Establish a Connection to the Solana Cluster
    const connection = new Connection(quicknodeEndpoint, 'confirmed');
    console.log('recipient', recipient.toBase58());
    console.log('amount', amount);
    console.log('reference', reference.toBase58());
    console.log('memo', memo);
  
    // 3 - Find the transaction reference
    const found = await findReference(connection, reference);
    console.log(found.signature)
  
    // 4 - Validate the transaction
    const response = await validateTransfer(
      connection,
      found.signature,
      {
        recipient,
        amount,
        splToken: undefined,
        reference,
        //memo
      },
      { commitment: 'confirmed' }
    );
    // 5 - Delete the payment request from local storage and return the response
    if (response) {
      paymentRequests.delete(reference.toBase58());
    }
    return response;
  }