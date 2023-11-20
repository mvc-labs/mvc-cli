import { Command, CommandRunner } from 'nest-commander'

import { getAddress } from '../utils'

@Command({
  name: 'get-address',
  description: 'A command for getting the address of your account',
})
export class GetAddressCommand extends CommandRunner {
  async run(): Promise<void> {
    const address = getAddress()
    console.log(`Your address is ${address}`)
  }
}
