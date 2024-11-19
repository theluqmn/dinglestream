import { Database } from "bun:sqlite"

export function CreateAccount(account) {
    const db = new Database("database/accounts.sqlite")

    const initialise = db.query("CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, username TEXT, firstname TEXT, lastname TEXT)")
    initialise.run()

    // Check if account already exists
    const check = db.query("SELECT * FROM accounts WHERE id = ?")
    const result = check.get(account.id)
    if (result) {
        console.log(`Account "${account.username}" already exists`)
        return
    }

    const insert = db.query("INSERT INTO accounts (id, username, firstname, lastname) VALUES (?, ?, ?, ?)")
    insert.run(account.id, account.username, account.firstname, account.lastname)

    console.log(`Created account ${account.username}`)
}