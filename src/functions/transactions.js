import { Database } from "bun:sqlite"
import { AccountGet } from "./accounts"

export function TransactionNew(sender, receiver, amount, description) {
    const db = InitialiseDB()

    const [sender_account, sender_check] = AccountGet(sender)
    const [receiver_account, receiver_check] = AccountGet(receiver)
    if (!sender_check || !receiver_check) {
        console.log(`Account ${sender} or ${receiver} does not exist`)
        return
    }

    const sender_bal = db.query("UPDATE balances SET balance = balance - ? WHERE id = ?")
    const receiver_bal = db.query("UPDATE balances SET balance = balance + ? WHERE id = ?")
    sender_bal.run(amount, sender)
    receiver_bal.run(amount, receiver)

    console.log(`Transferred ${amount} from '${sender}' to '${receiver}'`)
}

function InitialiseDB() {
    const db = new Database("database/accounts.sqlite")
    db.run("CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, username TEXT, firstname TEXT, lastname TEXT)")
    db.run("CREATE TABLE IF NOT EXISTS balances (id TEXT PRIMARY KEY, balance INTEGER)")
    return db
}