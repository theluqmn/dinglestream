# dinglestream

**`version 0.1`** | Designed and developed by [Luqman](https://theluqmn.github.io)

Financial management system backend webserver, designed to be performant and easily integrated with any projects where financial management is required. Create accounts, transfer funds, view transactions, and more.

> [!NOTE]
> dinglestream is not designed for production use. It is currently in version 0, where core features are being developed.

## Features

- Create accounts
- Modify accounts (except for balance, which is mutable only by transfer)
- Transfer funds

All of this is done through a simple REST API.

## Stack

- Language: JavaScript
- Runtime: [Bun](https://bun.sh)
- Database: SQLite

## To-do

### Version 1

Expanding the system to be more robust and secure

- [ ] authentication
- [ ] more robust error handling
- [ ] functions
  - [ ] transactions
  - [ ] verify
    - [ ] history
    - [ ] tracing
  - [ ] account
    - [ ] overview

No official release date for version 1. I might not even work on it lol.
