import { API_NET, mvc } from 'meta-contract'
import 'dotenv/config'
import { readFileSync } from 'fs'
import { Address } from 'meta-contract/dist/mvc'
import { resolve } from 'path'

function deriveMvcPrivateKey(mnemonic: string, path: string, network: API_NET.MAIN): mvc.PrivateKey {
  const mneObj = mvc.Mnemonic.fromString(mnemonic)
  const hdpk = mneObj.toHDPrivateKey('', network)
  return hdpk.deriveChild(path).privateKey
}

export function getWif(): string {
  // const config = await () => import('')
  const path = resolve('./') + '/account.json'
  const account = JSON.parse(readFileSync(path, 'utf8'))
  return deriveMvcPrivateKey(account.memonic, account.accountPath, account.network).toWIF()
}

export function getAddress(): string {
  // const config = await () => import('')
  const path = resolve('./') + '/account.json'
  const account = JSON.parse(readFileSync(path, 'utf8'))
  return deriveMvcPrivateKey(account.memonic, account.accountPath, account.network)
    .toAddress(account.network)
    .toString()
}
