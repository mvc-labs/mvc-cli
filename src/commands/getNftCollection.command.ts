import { Command, CommandRunner, Option } from 'nest-commander'
import { API_NET, Api, API_TARGET } from 'meta-contract'
import { getAddress } from '../utils'

@Command({
  name: 'get-nft-collection',
  description: 'A command for getting the non-fungible token collection of your account',
})
export class GetNftCollectionCommand extends CommandRunner {
  async run(_, options: Record<string, any>): Promise<void> {
    try {
      const tokens = options.tokens

      const api = new Api(API_NET.MAIN, API_TARGET.MVC)
      // api.authorize()
      const nft_res = (await api.getNonFungibleTokenSummary(getAddress())).filter((d) =>
        !tokens ? true : tokens.includes(d.genesis)
      )
      console.log(nft_res)
      // console.log('The collection of your non-fungible tokens is as follows:')
      // console.table(nft_res)
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
