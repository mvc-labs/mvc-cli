import { API_NET, API_TARGET, mvc } from 'meta-contract'
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
  const path = resolve('./') + '/cli-config.json'
  access(path, (err) => {
    if (err) {
      console.log('--You haven"t config your cli yet, pleast run `mvc-cli init` first')
      return 'file not exists'
    }
  })
  const config = JSON.parse(readFileSync(path, 'utf8'))
  return deriveMvcPrivateKey(config.memonic, config.accountPath, config.network).toWIF()
}

export function getAddress(): string {
  // const config = await () => import('')
  const path = resolve('./') + '/cli-config.json'
  access(path, (err) => {
    if (err) {
      console.log('--You haven"t config your cli yet, pleast run `mvc-cli init` first')
      return 'file not exists'
    }
  })
  const config = JSON.parse(readFileSync(path, 'utf8'))
  return deriveMvcPrivateKey(config.memonic, config.accountPath, config.network).toAddress(config.network).toString()
}

export function getApiTarget(): string {
  // const config = await () => import('')
  const path = resolve('./') + '/cli-config.json'
  access(path, (err) => {
    if (err) {
      console.log('--You haven"t config your cli yet, pleast run `mvc-cli init` first')
      return 'file not exists'
    }
  })
  const config = JSON.parse(readFileSync(path, 'utf8'))
  return config.apiTarget
}
