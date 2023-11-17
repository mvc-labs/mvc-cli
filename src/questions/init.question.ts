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
}