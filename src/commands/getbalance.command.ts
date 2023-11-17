import { Command, CommandRunner, Option } from 'nest-commander'
import { Wallet, API_NET, Api, API_TARGET } from 'meta-contract'
import Decimal from 'decimal.js-light'
import { getAddress, getWif } from '../utils'

@Command({
  name: 'getbalance',
  description: 'A command for getting the balance of your account',
})
export class GetbalanceCommand extends CommandRunner {
  async run(_, options: Record<string, any>): Promise<void> {
    const tokens = options.tokens
    console.log(tokens)
    const wif = getWif()
    const currentWallet = new Wallet(wif, API_NET.MAIN, 1)
    const balance = new Decimal(await currentWallet.getBalance()).div(10 ** 8).toNumber()
    console.log(`The balance of your address is ${balance} space`)

    const api = new Api(API_NET.MAIN, API_TARGET.MVC)
    const ft_res = (await api.getFungibleTokenSummary(getAddress()))
      .filter((d) => (!tokens ? true : tokens.includes(d.symbol.toLowerCase())))
      .map((d) => ({
        symbol: d.symbol.toLowerCase(),
        amount: new Decimal(d.balance).div(10 ** d.decimal).toNumber(),
      }))
    console.log('The balance of your fungible tokens is as follows:')
    console.table(ft_res)
  }
  @Option({
    flags: '-tk, --tokens <tokens...>',
    description: 'You can choose what tokens you want to check(Note: token name show tranform to lowercase)',
  })
  parseTokens(token: string, tokenssAccumulator: string[] = []): string[] {
    tokenssAccumulator.push(token)
    return tokenssAccumulator
  }
}
