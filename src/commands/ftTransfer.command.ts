import { Command, CommandRunner } from 'nest-commander'
import { FtManager } from 'meta-contract'
import Decimal from 'decimal.js-light'
import { getWif } from '../utils'
import { readFileSync } from 'fs'

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
    const path = require.resolve('./tokenConfig.json')
    const config = JSON.parse(readFileSync(path, 'utf8'))
    try {
      const [token, address, amount] = inputs // amount is space , you need to tranform to satoshi
      let tokenConfig
      let finalGenesis = ''
      if (token.length === 40) {
        tokenConfig = config.find((d) => d.genesis === token)
        finalGenesis = token
      } else {
        tokenConfig = config.find((d) => d.name === token)
        finalGenesis = tokenConfig.genesis
      }
      console.log('finalgenesis:', finalGenesis)
      if (finalGenesis === '' || !tokenConfig) {
        console.log("You haven't registered this fungible token!")
        return
      }
      const wif = getWif()

      const ft = new FtManager({ purse: wif })

      const tokenAmount = new Decimal(amount).mul(Number(tokenConfig.decimal)).toNumber().toString()
      console.log('transfer decimal and amount', Number(tokenConfig.decimal), tokenAmount)
      await ft.transfer({
        codehash: tokenConfig.codehash,
        genesis: tokenConfig.genesis,
        senderWif: wif,
        receivers: [{ address, amount: tokenAmount }],
      })

      console.log('sending ft success!')
    } catch (error) {
      console.log('err', error)
    }
  }
}
