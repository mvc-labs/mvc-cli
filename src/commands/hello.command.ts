import { Command, CommandRunner } from 'nest-commander'
import { resolve } from 'path'

@Command({
  name: 'hello',
})
export class HelloCommand extends CommandRunner {
  async run(): Promise<void> {
    const path = resolve(__dirname) + '/account.json'
    const config = await import(path)
    console.log({ config })
  }
}
