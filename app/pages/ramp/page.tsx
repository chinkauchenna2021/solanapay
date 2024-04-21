import React from 'react'
import Link  from 'next/link'
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk"
import { ToastContainer, toast } from 'react-toastify';

function page() {
const buy = ()=>{
   try{
    new RampInstantSDK({
        hostAppName: 'SKYTRADE APP',
        hostLogoUrl: '/images/test-logo-ramp.png',
        hostApiKey: "vpkbydq452etx3pw8oeeh5ug3wqzmb7ub8h8qg35",
        defaultAsset: 'SOLANA_USDC',
      }).show().on('*', (event: {type:string}) => {
        if ((event.type as string) === 'PURCHASE_SUCCESS') {
          toast.success("Success !. Your USDC have been purchased successfully");
        } else if ((event.type as string) === 'PURCHASE_FAILED') {
          toast.success('Purchase failed');
        }
      });

   }catch(err){

   }

}



  return (
    <div className='container w-full h-screen justify-center flex items-center'>
       <div  className='w-3/6'>
              <div className='w-full h-fit py-2 flex justify-end'>
                <Link className='text-slate-600' href={'/'}>Home</Link>
              </div>
              <div  className='w-full h-full justify-center items-center'>
                 <button onClick={buy}  className='w-fit h-fit p-2 border bg-slate-700 text-white text-2xl tracking-wide flex justify-center items-center'>
                    Buy from Bluedil Ramp 
                 </button>

              </div>
       </div>
       <ToastContainer />
    </div>
  )
}

export default page
