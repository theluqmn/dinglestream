import { Database } from "bun:sqlite"

export function AccountGet(id) {
    const db = AccountDB()

    const account = db.query("SELECT * FROM accounts WHERE id = ?").get(id)
    if (!account) {
        return [null, false]
    }

    return [account, true]
}

export function AccountCreate(account) {
    const db = AccountDB()

    const [_, check] = AccountGet(account.id)
    if (check) {
        console.log(`Account ${account.username} already exists`)
        return
    }

    const create_acc = db.query("INSERT INTO accounts (id, username, firstname, lastname) VALUES (?, ?, ?, ?)")
    const create_bal = db.query("INSERT INTO balances (id, balance) VALUES (?, ?)")
    create_acc.run(account.id, account.username, account.firstname, account.lastname)
    create_bal.run(account.id, 10)

    console.log(`Created account ${account.username}`)
}

export function AccountUpdate(account) {
    const db = AccountDB()

    const [_, check] = AccountGet(account.id)
    if (!check) {
        console.log(`Account ${account.username} does not exist`)
        return
    }

    const update_acc = db.query("UPDATE accounts SET username = ?, firstname = ?, lastname = ? WHERE id = ?")
    update_acc.run(account.username, account.firstname, account.lastname, account.id)

    console.log(`Updated account ${account.username}`)
}

export function AccountDelete(id) {
    const db = AccountDB()

    const [account, check] = AccountGet(id)
    if (!check) {
        console.log(`Account ${account.username} does not exist`)
        return
    }

    const delete_acc = db.query("DELETE FROM accounts WHERE id = ?")
    const delete_bal = db.query("DELETE FROM balances WHERE id = ?")
    delete_acc.run(id)
    delete_bal.run(id)

    console.log(`Deleted account ${account.username}`)
}

function AccountDB() {
    const db = new Database("database/accounts.sqlite")

    const init_account = db.query("CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, username TEXT, firstname TEXT, lastname TEXT)")
    const init_balance = db.query("CREATE TABLE IF NOT EXISTS balances (id TEXT PRIMARY KEY, balance INTEGER)")
    init_account.run()
    init_balance.run()

    return db
}