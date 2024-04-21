"use client"
import { Magic } from "magic-sdk"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
const { Web3 } = require("web3")

type MagicContextType = {
  magic: Magic | null
  web3: typeof Web3 | null
}

const MagicContext = createContext<MagicContextType>({
  magic: null,
  web3: null,
})

export const useMagic = () => useContext(MagicContext)

const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null)
  const [web3, setWeb3] = useState<typeof Web3 | null>(null)

  useEffect(() => {
      const magic = new Magic("pk_live_B3732D9175F332F6", {
        network: {
          rpcUrl: "https://rpc.ankr.com/solana_devnet",
          chainId: 11155111,
        },
      })

      setMagic(magic)
      setWeb3(new Web3((magic as any).rpcProvider))
      console.log(magic)
  }, [])

  const value = useMemo(() => {
    return {
      magic,
      web3,
    }
  }, [magic, web3])

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
}

export default MagicProvider
