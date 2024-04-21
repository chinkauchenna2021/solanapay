import React, { Dispatch, SetStateAction } from 'react'

interface IReset{
              reset: Dispatch<SetStateAction<boolean>>
}

const RampModal: React.FC<IReset> = ({reset}) => {
  return (
      <div  className='!w-full min-h-screen absolute top-0 left-0 z-[99900000] bg-gray-600 flex justify-center items-center'>
          <div className='w-full lg:w-4/6 '>
          <div className='w-full h-10 flex justify-center items-center'>
               <span  onClick={()=>reset(false)} className='cursor-pointer text-2xl text-white h-10 w-10 rounded-full bg-gray-900 flex justify-center items-center'>x</span>
          </div>
          <div className='min-h-[100vh] py-12 w-full justify-center flex'>
              <iframe className='!h-[800px] w-fit lg:w-4/6' allow="usb; clipboard-write; payment; microphone; camera" loading="lazy" src="https://widget.mtpelerin.com/?_ctkn=bec6626e-8913-497d-9835-6e6ae9edb144&mode=dark" title="Bluedill Excahnge"></iframe>
          </div>
          </div>

      </div>
  )
}

export default RampModal
