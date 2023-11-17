import { Command, CommandRunner } from 'nest-commander'
import { Wallet, API_NET } from 'meta-contract'
import Decimal from 'decimal.js-light'
import { getWif } from '../utils'

@Command({
  name: 'get-balance',
  description: 'A command for getting the balance of your account',
})
export class GetbalanceCommand extends CommandRunner {
  async run(): Promise<void> {
    const wif = getWif()
    const currentWallet = new Wallet(wif, API_NET.MAIN, 1)
    const balance = new Decimal(await currentWallet.getBalance()).div(10 ** 8).toNumber()
    console.log(`The balance of your address is ${balance} space`)
  }
}
