import { Command, CommandRunner } from 'nest-commander'
import { Wallet, API_NET } from 'meta-contract'
import Decimal from 'decimal.js-light'
import { getWif } from '../utils'

@Command({
  name: 'send',
  arguments: '<address> <amount>',
  description: 'A command for transferring your space.',
  argsDescription: {
    address: 'The address you want to transfer your space to',
    amount: 'The transfer amount for this transaction',
  },
})
export class SendCommand extends CommandRunner {
  async run(inputs: string[]): Promise<void> {
    const [address, amount] = inputs // amount is space , you need to tranform to satoshi

    const wif = getWif()

    const currentWallet = new Wallet(wif, API_NET.MAIN, 1)
    // console.log(new Decimal(amount).mul(10 ** 8).toNumber())
    await currentWallet.send(address, new Decimal(amount).mul(10 ** 8).toNumber())
    console.log('sending mvc space success!')
  }
}
