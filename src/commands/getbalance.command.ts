import { Command, CommandRunner } from 'nest-commander'
import { API_NET, API_TARGET, Api } from 'meta-contract'
import Decimal from 'decimal.js-light'
import { getAddress, getApiHost } from '../utils'

@Command({
  name: 'get-balance',
  description: 'A command for getting the balance of your account',
})
export class GetbalanceCommand extends CommandRunner {
  async run(): Promise<void> {
    // const wif = getWif()
    // const currentWallet = new Wallet(wif, API_NET.MAIN, 1)
    // const balance = new Decimal(await currentWallet.getBalance()).div(10 ** 8).toNumber()

    // console.log(`The balance of your address is ${balance} space`)
    try {
      const apiHostUser = getApiHost()
      const isCustomApi = !['mvcapi', 'cyber3'].includes(apiHostUser)
      const apiHost = apiHostUser === 'mvcapi' ? API_TARGET.MVC : API_TARGET.CYBER3

      const api = isCustomApi ? new Api(API_NET.MAIN, apiHost, apiHostUser) : new Api(API_NET.MAIN, apiHost)

      const ft_res = await api.getBalance(getAddress())

      console.log('The space amount of your address is as follows:')
      console.table({
        confirmed_amount: new Decimal(ft_res.balance).div(10 ** 8).toNumber(),
        unconfirmed_amount: new Decimal(ft_res.pendingBalance).div(10 ** 8).toNumber(),
      })
    } catch (error) {
      console.log(error)
    }
  }
}
