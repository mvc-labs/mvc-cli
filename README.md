# mvc-cli

## Description

This is a simple CLI tool to operate MVC cli wallet.

## Installation

yarn add @mvc-org/mvc-cli

## Usage

### Config your account

At your root project dir, add `.env` file

```
MEMONIC="abc edf"
ACCOUNTPATH="m/44'/10001'/0'/0/0"
NETWORK=mainnet
```

change memonic value to your account's real value

### Usage

mvc-cli [options] [command]

Options:
-h, --help display help for command

Commands
| command | description |
| :----- | :----- |
| <div style="width: 150pt"> send \<address> \<amount>| for space transferring |
| getbalance | for getting the balance of your account |
| ft-transfer \<token> \<address> \<amount> | for getting the balance of your account |
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

## Dependencies

- [NestJS](https://docs.nestjs.com/)
- [NestJS Commander](https://nest-commander.jaymcdoniel.dev/)
