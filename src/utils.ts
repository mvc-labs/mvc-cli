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
  const path = resolve('./') + '/cli-config.json'
  access(path, (err) => {
    if (err) {
      throw Error('--You haven"t config your cli yet, pleast run `mvc-cli init` first')
    }
  })
  const config = JSON.parse(readFileSync(path, 'utf8'))
  if (config.memonic.split(' ').length < 12) {
    console.log(
      "The configed memonic value's format in your `cli-config.json` file in  not correct, please rerun the `mvc-cli init` command."
    )
    return 'not set correctly'
  }
  return deriveMvcPrivateKey(config.memonic, config.accountPath, config.network).toWIF()
}

export function getAddress(): any {
  // const config = await () => import('')
  const path = resolve('./') + '/cli-config.json'
  access(path, (err) => {
    if (err) {
      throw Error('--You haven"t config your cli yet, pleast run `mvc-cli init` first')
    }
  })
  const config = JSON.parse(readFileSync(path, 'utf8'))
  if (config.memonic.split(' ').length < 12) {
    console.log(
      "The configed memonic value's format in your `cli-config.json` file in  not correct, please rerun the `mvc-cli init` command."
    )
    return 'not set correctly'
  }
  return deriveMvcPrivateKey(config.memonic, config.accountPath, config.network).toAddress(config.network).toString()
}

export function getApiHost(): string {
  // const config = await () => import('')
  const path = resolve('./') + '/cli-config.json'
  access(path, (err) => {
    if (err) {
      console.log('--You haven"t config your cli yet, pleast run `mvc-cli init` first')
      return 'file not exists'
    }
  })
  const config = JSON.parse(readFileSync(path, 'utf8'))
  return config.apiHost
}
