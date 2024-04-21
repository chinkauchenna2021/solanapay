"use client"
import {
  ConnectButton,
  DisconnectButton,
  ShowUIButton,
  SignMessage,
  WalletDetail,
} from '@/app/components/index'
import { useUser } from "@/app/context/UserContext"
import SendTransaction from "@/app/components/SendTransaction"
import Link  from 'next/link'

const Page = ()=> {
  const { user } = useUser()
  return (
    <main className="min-h-screen">
     <div className='w-full cursor-pointer h-12 text-purple-950'>
        <span className='text-2xl tracking-wide p-3'><Link href={'/'}>Home</Link></span>
     </div>
      {user ? (
        <div className="p-2 flex flex-col w-[40vw] mx-auto">
          <WalletDetail />
          <ShowUIButton />
          <SendTransaction />
          <SignMessage />
          <DisconnectButton />
        </div>
      ) : (
        <div className="p-2 text-center">
          <ConnectButton />
        </div>
      )}
    </main>
  )
}

export default Page;