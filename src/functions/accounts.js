import { InitialiseDB } from "../utils/database"

export function AccountGet(id) {
    const  db = InitialiseDB("database/accounts.sqlite")

    const account = db.query("SELECT * FROM accounts WHERE id = ?").get(id)
    if (!account) {
        return null, false
    }

    return account, true
}

export function AccountCreate(account) {
    const db = InitialiseDB("database/accounts.sqlite")

    const [account, check] = AccountGet(account.id)
    if (check) {
        console.log(`Account ${account.username} already exists`)
        return
    }

    const insert = db.query("INSERT INTO accounts (id, username, firstname, lastname) VALUES (?, ?, ?, ?)")
    insert.run(account.id, account.username, account.firstname, account.lastname)
    console.log(`Created account ${account.username}`)
}

export function AccountUpdate(account) {
    const db = InitialiseDB("database/accounts.sqlite")

    const [account, check] = AccountGet(account.id)
    if (!check) {
        console.log(`Account ${account.username} does not exist`)
        return
    }

    const update = db.query("UPDATE accounts SET username = ?, firstname = ?, lastname = ? WHERE id = ?")
    update.run(account.username, account.firstname, account.lastname, account.id)
    console.log(`Updated account ${account.username}`)
}

export function AccountDelete(id) {
    const db = InitialiseDB("database/accounts.sqlite")

    const [account, check] = AccountGet(id)
    if (!check) {
        console.log(`Account ${account.username} does not exist`)
        return
    }

    const query = db.query("DELETE FROM accounts WHERE id = ?")
    query.run(id)
    console.log(`Deleted account ${account.username}`)
}