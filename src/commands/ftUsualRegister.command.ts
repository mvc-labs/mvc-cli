import { writeFile } from 'fs'
import { Command, CommandRunner, InquirerService } from 'nest-commander'
import { resolve } from 'path'

const ftList = [
  {
    name: 'msp',
    genesis: 'b2d75931958114e48c9927160f80363eae78e2dc',
    decimal: '1e8',
    codehash: 'a2421f1e90c6048c36745edd44fad682e8644693',
  },
  {
    name: 'usdt',
    genesis: '94c2ae3fdbf95a4fb0d788c818cf5fcc7a9aa66a',
    decimal: '1e8',
    codehash: 'a2421f1e90c6048c36745edd44fad682e8644693',
  },
  {
    name: 'sc',
    genesis: '185b4c8fb97a133f1587411b449d30d87ce7d155',
    decimal: '1e8',
    codehash: 'a2421f1e90c6048c36745edd44fad682e8644693',
  },
  {
    name: 'mc',
    genesis: '07e4c5a9f866164108de005be81d40ccbd2e964c',
    decimal: '1e8',
    codehash: 'a2421f1e90c6048c36745edd44fad682e8644693',
  },
  {
    name: 'vemsp',
    genesis: 'fad7b10812fa76718127e084bb71cdb87853261c',
    decimal: '1e8',
    codehash: 'a2421f1e90c6048c36745edd44fad682e8644693',
  },
]

@Command({
  name: 'ft-usual-register',
  description: 'A command for registering usual fungible tokens',
})
export class FtUsualRegisterCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super()
  }
  async run(): Promise<void> {
    try {
      const path = resolve('./') + '/tokenRegister.json'
      console.log('register token to path: ', path)
      writeFile(path, JSON.stringify(ftList), function (err_new) {
        if (err_new) throw err_new
        console.log('Usual ft <tokenRegister.json> is created')
      })
      // const path = require.resolve('./tokenRegister.json')
    } catch (error) {
      console.log('err', error)
    }
  }
}
