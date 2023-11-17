# mvc-cli

## Description

This is a simple CLI tool to operate MVC cli wallet.

## Installation

yarn add @mvc-org/mvc-cli

## Usage

### Config your account

Open terminal, at your current working directory, run `mvc-cli init` and answer the next series of questions, this will generate `account.json` file at your current working directory.

```
// account.json file
MEMONIC="abc edf"
ACCOUNTPATH="m/44'/10001'/0'/0/0"
NETWORK=mainnet
```

### Usage

mvc-cli [command] [options]

Options:

- -h, --help display help for command
- -tk, --tokens <tokens...> You can choose what tokens you want to check(Note1:token name should tranform to lowercase, Note2: this option is for `getbalance` command)

Commands
| command | description |
| :----- | :----- |
| <div style="width: 150pt"> send \<address> \<amount>| for space transferring |
| getbalance [options] | for getting space and token balance of your account |
| ft-transfer \<token> \<address> \<amount> | for transferring your fungible token to target address|
| ft-register | for registering a fungible token, just answer the following series of questions. |

## Example

#### to get help text for a specific command

```
mvc-cli send --help
```

#### transfer 0.01 space to target address

```
mvc-cli send 12ecgYPjeZh3mv6izoVuBSaa1Dxxwv2J1G 0.01
```

#### transfer 0.88 MSP ft token to target address

```
mvc-cli ft-transfer msp 12ecgYPjeZh3mv6izoVuBSaa1Dxxwv2J1G 0.88
// or
mvc-cli ft-transfer b2d75931958114e48c9927160f80363eae78e2dc 12ecgYPjeZh3mv6izoVuBSaa1Dxxwv2J1G 0.88
// b2d.... is token MSP's genesis code
```

### register new fungible tokens

Open terminal, At your current working directory, run `mvc-cli ft-register` and answer the next series of questions, this will generate `tokenRegister.json` file at your current working directory.

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

## Dependencies

- [NestJS](https://docs.nestjs.com/)
- [NestJS Commander](https://nest-commander.jaymcdoniel.dev/)
