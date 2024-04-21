'use client'

import React , {useState} from 'react'
import Link  from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import RampModal from '@/app/components/ui/modal/RampModal';

function page() {
const [showRamp , setShowRamp] = useState(false)
const buy = ()=>{
setShowRamp(true)

}



  return (
    <div className='container w-full h-screen justify-center flex items-center'>
       <div  className='w-5/6 h-full'>
              <div className='w-full h-fit py-2 flex justify-end'>
                <Link className='text-white bg-gray-700 p-2' href={'/'}>Home</Link>
              </div>
              <div  className='w-full h-screen justify-center items-center'>
                 <button onClick={buy}  className='w-fit h-fit p-2 border bg-slate-700 text-white text-2xl tracking-wide flex justify-center items-center'>
                    Buy from Bluedil Ramp 
                 </button>
               {
                showRamp &&  <RampModal reset={setShowRamp} />
                
               }
              </div>
       </div>
       <ToastContainer />
    </div>
  )
}

export default page
