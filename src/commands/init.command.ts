import { Command, CommandRunner, InquirerService } from 'nest-commander'
import { writeFile } from 'fs'
import { resolve } from 'path'

interface InitBody {
  memonic: string
  accountPath: string
  network: string
  apiHost: 'mvcapi' | 'cyber3' | 'custom your local service(example: localhost:8000)'
  customApi?: string
}

@Command({
  name: 'init',
  description: 'A command for initiating your wallet account.',
})
export class InitCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super()
  }
  async run(): Promise<void> {
    try {
      const answer = await this.inquirer.ask<InitBody>('init_questions', undefined)
      console.log('Your answer is ', answer)
      const path = resolve('./') + '/cli-config.json'
      writeFile(path, JSON.stringify(answer, null, 2), (err) => {
        if (err) {
          console.log('Failed to write cli config to file')
          return
        }
        console.log('Updated cli config file successfully')
      })
    } catch (error) {
      console.log('err', error)
    }
  }
}
