import { Question, QuestionSet } from 'nest-commander'

@QuestionSet({ name: 'init_questions' })
export class InitQuestions {
  @Question({
    message: 'What is the memonic value of your account?',
    name: 'memonic',
  })
  parseMemonic(val: string) {
    return val
  }
  @Question({
    message: 'What is the path of your account?(Hit enter to use default value)',
    name: 'accountPath',
  })
  parsePath(val: string) {
    return val === '' ? "m/44'/10001'/0'/0/0" : val
  }
  @Question({
    message: 'Which network are you going to use?(Hit enter to use default value)',
    name: 'network',
  })
  parseNetwork(val: string) {
    return val === '' ? 'mainnet' : val
  }
  @Question({
    message: 'Which api host are you going to use?',
    name: 'apiHost',
    type: 'list',
    choices: ['mvcapi', 'cyber3', 'custom your local service(example: localhost:8000)'],
  })
  parseApiTarget(val: string) {
    return val
  }
  @Question({
    message: 'Please custom your local api host',
    name: 'customApi',
    when: (answers) => {
      return answers.apiHost === 'custom your local service(example: localhost:8000)'
    },
  })
  parseCustomApi(val: string) {
    return val.endsWith('/') ? val : val + '/'
  }
}
