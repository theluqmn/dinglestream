import { Database } from "bun:sqlite"

export function AccountCreate(account) {
    const db = initialiseDB()

    const [account, check] = AccountGet(account.id)
    if (check) {
        console.log(`Account ${account.username} already exists`)
        return
    }

    const insert = db.query("INSERT INTO accounts (id, username, firstname, lastname) VALUES (?, ?, ?, ?)")
    insert.run(account.id, account.username, account.firstname, account.lastname)

    console.log(`Created account ${account.username}`)
}

export function AccountGet(id) {
    const  db = initialiseDB()

    const account = db.query("SELECT * FROM accounts WHERE id = ?").get(id)
    if (!account) {
        return null, false
    }

    return account, true
}

function initialiseDB() {
    const db = new Database("database/accounts.sqlite")
    const initialise = db.query("CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, username TEXT, firstname TEXT, lastname TEXT)")
    initialise.run()

    return db
}