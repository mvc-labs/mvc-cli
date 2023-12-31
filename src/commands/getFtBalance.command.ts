import { Command, CommandRunner, Option } from 'nest-commander'
import { API_NET, Api, API_TARGET } from 'meta-contract'
import Decimal from 'decimal.js-light'
import { getAddress, getApiHost } from '../utils'

@Command({
  name: 'get-ft-balance',
  description: 'A command for getting the fungible token balance of your account',
})
export class GetFtBalanceCommand extends CommandRunner {
  async run(_, options: Record<string, any>): Promise<void> {
    try {
      const tokens = options.tokens
      const apiHostUser = getApiHost()
      const isCustomApi = !['mvcapi', 'cyber3'].includes(apiHostUser)
      const apiHost = apiHostUser === 'mvcapi' ? API_TARGET.MVC : API_TARGET.CYBER3

      const api = isCustomApi ? new Api(API_NET.MAIN, apiHost, apiHostUser) : new Api(API_NET.MAIN, apiHost)

      const ft_res = (await api.getFungibleTokenSummary(getAddress()))
        .filter((d) => (!tokens ? true : tokens.includes(d.symbol.toLowerCase())))
        .map((d) => ({
          symbol: d.symbol.toLowerCase(),
          confirmed_amount: new Decimal(d.balance).div(10 ** d.decimal).toNumber(),
          unconfirmed_amount: new Decimal(d.pendingBalance).div(10 ** d.decimal).toNumber(),
        }))
      console.log('The balance of your fungible tokens is as follows:')
      console.table(ft_res)
    } catch (error) {
      console.log(error)
    }
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
