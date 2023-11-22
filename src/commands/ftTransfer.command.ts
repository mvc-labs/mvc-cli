import { Command, CommandRunner } from 'nest-commander'
import { FtManager } from 'meta-contract'
import Decimal from 'decimal.js-light'
import { getWif } from '../utils'
import { readFileSync } from 'fs'
import { resolve } from 'path'

@Command({
  name: 'ft-transfer',
  description: 'A command for the transfer of fungible tokens.',
  arguments: '<token> <address> <amount>',
  argsDescription: {
    token: "The fungible token's name for token, you can also use its gensisi code instead",
    address: 'The address you want to transfer your token to',
    amount: 'The transfer amount for this transaction',
  },
})
export class FtTransferCommand extends CommandRunner {
  async run(inputs: string[]): Promise<void> {
    const path = resolve('./') + '/tokenRegister.json'
    // const dev_path = resolve(__dirname) + '/tokenRegister.json'
    // console.log('path', path )
    const config = JSON.parse(readFileSync(path, 'utf8'))
    try {
      const [token, address, amount] = inputs // amount is space , you need to tranform to satoshi
      let tokenRegister
      let finalGenesis = ''
      if (token.length === 40) {
        tokenRegister = config.find((d) => d.genesis === token)
        finalGenesis = token
      } else {
        tokenRegister = config.find((d) => d.name === token)
        finalGenesis = tokenRegister.genesis
      }
      // console.log('finalgenesis:', finalGenesis)
      if (finalGenesis === '' || !tokenRegister) {
        console.log("You haven't registered this fungible token!")
        return
      }
      const wif = getWif()

      const ft = new FtManager({ purse: wif })

      const tokenAmount = new Decimal(amount).mul(Number(tokenRegister.decimal)).toNumber().toString()
      // console.log('transfer decimal and amount', Number(tokenRegister.decimal), tokenAmount)
      const { txid } = await ft.transfer({
        codehash: tokenRegister.codehash,
        genesis: tokenRegister.genesis,
        senderWif: wif,
        receivers: [{ address, amount: tokenAmount }],
      })
      const url = `https://www.mvcscan.com/tx/${txid}`
      console.log(`sending ft success! txid: ${txid}`)
      console.log(`You can browse this transaction at ${url}`)
    } catch (error) {
      console.log('err', error)
    }
  }
}
