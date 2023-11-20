import { API_NET, mvc } from 'meta-contract'
import 'dotenv/config'
import { readFileSync, access } from 'fs'
import { resolve } from 'path'

function deriveMvcPrivateKey(mnemonic: string, path: string, network: API_NET.MAIN): mvc.PrivateKey {
  const mneObj = mvc.Mnemonic.fromString(mnemonic)
  const hdpk = mneObj.toHDPrivateKey('', network)
  return hdpk.deriveChild(path).privateKey
}

export function getWif(): string {
  // const config = await () => import('')
  const path = resolve('./') + '/account.json'
  access(path, (err) => {
    if (err) {
      console.log('--You haven"t config your account yet, pleast run `mvc-cli` first')
      return 'file not exists'
    }
  })
  const account = JSON.parse(readFileSync(path, 'utf8'))
  return deriveMvcPrivateKey(account.memonic, account.accountPath, account.network).toWIF()
}

export function getAddress(): string {
  // const config = await () => import('')
  const path = resolve('./') + '/account.json'
  access(path, (err) => {
    if (err) {
      console.log('--You haven"t config your account yet, pleast run `mvc-cli` first')
      return 'file not exists'
    }
  })
  const account = JSON.parse(readFileSync(path, 'utf8'))
  return deriveMvcPrivateKey(account.memonic, account.accountPath, account.network)
    .toAddress(account.network)
    .toString()
}
