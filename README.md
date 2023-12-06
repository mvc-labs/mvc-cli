# mvc-cli

## Description

This is a simple CLI tool to operate MVC cli wallet.

## Installation

### Prerequisite

You need to install Node on your computer first. Open your terminal and run the command `node -v`. If the console prints 'v18.14' or a similar version number, it indicates that Node.js has been successfully installed on your computer. The exact version may vary depending on the specific Node version you have installed.
If nothing shows, it means you haven't installed Node.
We recommand using [nvm](https://github.com/nvm-sh/nvm) to finish this setup.

## Install

With **Node** environment successfully set, you can install our cli tool as follows:

```
npm install -g @mvc-org/mvc-cli
```

## Usage

### Step by Step Basic Config(Must Do!!!)

#### Step1: Config your account

Open the terminal at your current working directory and run `mvc-cli init` and answer the next series of questions, this will generate `cli-config.json` file at your current working directory.

```
// cli-config.json file
{
  "memonic": "abc edf",
  "accountPath": "m/44'/10001'/0'/0/0",
  "network": "mainnet",
  "apiHost": "localhost:8000"
}
```

#### Step2: Register usual fungible tokens

Open terminal, at your current working directory, run `mvc-cli ft-usual-register` , this will generate `tokenRegister.json` file at your current working directory.

```
// tokenRegister.json file
[
  {
    "name": "msp",
    "genesis": "b2d75931958114e48c9927160f80363eae78e2dc",
    "decimal": "1e8",
    "codehash": "a2421f1e90c6048c36745edd44fad682e8644693"
  },
  ...
]
```

> **Note**: If you are using a Windows system, running this command may encounter a display format error prompt. As a result, the result file may not be generated correctly. You can manually input and create the JSON file using the format provided above.

### Usage

mvc-cli [command] [options]

Options:

- -h, --help display help for command
- -tk, --tokens <tokens...> You can choose what tokens you want to check(**Note1**:token name should tranform to lowercase, **Note2**: this option is for `get-ft-balance` and `get-nft-balance` command, **Note3**, for ft token is symbol, for nft token is genesis id)

Commands
| command | description |
| :----- | :----- |
| <div style="width: 220pt"> send \<address> \<amount>| for space transferring |
| get-balance | for getting space amount of current account |
| get-address | for getting address of current account |
| get-ft-balance -tk, --tokens <tokens...> | for getting fungible token balance of your account |
| get-nft-collection -tk, --tokens <tokens...> | for getting non-fungible token collection of your account |
| ft-transfer \<token> \<address> \<amount> | for transferring your fungible token to target address|
| ft-usual-register | this is a must-do command. |
| ft-register | for registering a new fungible token, just answer the following series of questions. |

## Example

### get help text for a specific command

```
mvc-cli send --help
```

### transfer 0.01 space to target address

```
mvc-cli send 12ecgYPjeZh3mv6izoVuBSaa1Dxxwv2J1G 0.01
```

### transfer 0.88 MSP ft token to target address

```
mvc-cli ft-transfer msp 12ecgYPjeZh3mv6izoVuBSaa1Dxxwv2J1G 0.88
// or
mvc-cli ft-transfer b2d75931958114e48c9927160f80363eae78e2dc 12ecgYPjeZh3mv6izoVuBSaa1Dxxwv2J1G 0.88
// b2d.... is token MSP's genesis code
```

### register new fungible tokens

Open the terminal at your current working directory, then run `mvc-cli ft-register` and answer the next series of questions, this will generate `tokenRegister.json` file at your current working directory.

```
// tokenRegister.json
[
  {
    "name": "msp",
    "genesis": "b2d75931958114e48c9927160f80363eae78e2dc",
    "decimal": "1e8",
    "codehash": "a2421f1e90c6048c36745edd44fad682e8644693"
  },
]
```

> **Note**: If you are using a Windows system, running this command may encounter a display format error prompt. As a result, the result file may not be generated correctly. You can manually input and create the JSON file using the format provided above.

### get balance

#### get mvc space

```
mvc-cli get-balance
```

#### get ft balance

```
mvc-cli get-ft-balance  // this will get all ft's balance
mvc-cli get-ft-balance --tokens msp mc // get specific tokens' balance, msp mc is tokens's symbol(!!remember transfer to lowercase!!)
```

#### get nft collection

```
mvc-cli get-nft-collection  // this will get all nft collection
mvc-cli get-nft-collection --tokens b2d75xxxxxxx  efd75xxxxxxx/ / get specific nfts' information, b2d75xxxxxxx is token's genesis id
```

## Dependencies

- [NestJS](https://docs.nestjs.com/)
- [NestJS Commander](https://nest-commander.jaymcdoniel.dev/)
