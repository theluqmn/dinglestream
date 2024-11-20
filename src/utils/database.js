import { Database } from "bun:sqlite"

export function InitialiseDB(path) {
    const db = new Database(path)
    const initialise = db.query("CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, username TEXT, firstname TEXT, lastname TEXT)")
    initialise.run()

    return db
}