import { API_NET, mvc } from 'meta-contract'
import 'dotenv/config'

function deriveMvcPrivateKey(mnemonic: string, path: string, network: API_NET.MAIN): mvc.PrivateKey {
  const mneObj = mvc.Mnemonic.fromString(mnemonic)
  const hdpk = mneObj.toHDPrivateKey('', network)
  return hdpk.deriveChild(path).privateKey
}

export function getWif(): string {
  return deriveMvcPrivateKey(process.env.MEMONIC, process.env.ACCOUNTPATH, API_NET.MAIN).toWIF()
}
