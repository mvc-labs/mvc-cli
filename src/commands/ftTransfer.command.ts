import { Command, CommandRunner } from 'nest-commander'
import { FtManager } from 'meta-contract'
import Decimal from 'decimal.js-light'
import { getWif } from '../utils'
import { readFileSync } from 'fs'

@Command({
  name: 'ftTransfer',
  arguments: '<tokenName> <address> <amount>',
  options: {},
})
export class FtTransferCommand extends CommandRunner {
  async run(inputs: string[]): Promise<void> {
    const path = require.resolve('./tokenConfig.json')
    const config = JSON.parse(readFileSync(path, 'utf8'))
    try {
      const [tokenName, address, amount] = inputs // amount is space , you need to tranform to satoshi
      const { genesis, codehash, exchangeRate } = config.find((d) => d.name === tokenName)

      if (!genesis) {
        console.log("You haven't registered this fungible token!")
        return
      }
      const wif = getWif()

      const ft = new FtManager({ purse: wif })
      console.log(genesis, codehash, exchangeRate, '------')
      const tokenAmount = new Decimal(amount).mul(Number(exchangeRate)).toNumber().toString()
      console.log('transfer amount', tokenAmount)
      await ft.transfer({
        codehash,
        genesis,
        senderWif: wif,
        receivers: [{ address, amount: tokenAmount }],
      })

      console.log('sending ft success!')
    } catch (error) {
      console.log('err', error)
    }
  }
}
