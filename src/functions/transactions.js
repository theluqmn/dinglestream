import { Database } from "bun:sqlite"
import { AccountGet } from "./accounts"

export function TransactionNew(sender, receiver, amount, description) {
    const account = AccountDB()
    const transaction = TransactionDB()

    const [sender_account, sender_check] = AccountGet(sender)
    const [receiver_account, receiver_check] = AccountGet(receiver)
    
    // Checks
    if (!sender_check || !receiver_check) { console.log(`Account ${sender} or ${receiver} does not exist`); return }
    if (sender == receiver) { console.log(`Sender and receiver cannot be the same`); return }
    if (sender_account.balance < amount) { console.log(`Account ${sender} does not have enough funds`); return }
    if (amount < 0) { console.log(`Amount cannot be negative`); return }
    if (amount == 0) { console.log(`Amount cannot be 0`); return }
    if (!description) { description = "Not provided"; return }
    
    const sender_bal = account.query("UPDATE balances SET balance = balance - ? WHERE id = ?")
    const receiver_bal = account.query("UPDATE balances SET balance = balance + ? WHERE id = ?")
    sender_bal.run(amount, sender)
    receiver_bal.run(amount, receiver)

    const transaction_rec = transaction.query("INSERT INTO transactions (id, sender, receiver, amount, description) VALUES (?, ?, ?, ?, ?)")
    transaction_rec.run(crypto.randomUUID(), sender, receiver, amount, description)

    console.log(`Transferred ${amount} from '${sender}' to '${receiver}'`)
}

function AccountDB() {
    const db = new Database("database/accounts.sqlite")
    db.run("CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, username TEXT, firstname TEXT, lastname TEXT)")
    db.run("CREATE TABLE IF NOT EXISTS balances (id TEXT PRIMARY KEY, balance INTEGER)")
    return db
}

function TransactionDB() {
    const db = new Database("database/transactions.sqlite")
    db.run("CREATE TABLE IF NOT EXISTS transactions (id TEXT PRIMARY KEY, sender TEXT, receiver TEXT, amount INTEGER, description TEXT)")
    return db
}