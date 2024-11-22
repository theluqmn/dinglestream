import { AccountCreate, AccountDelete } from "./functions/accounts"
import { TransactionNew, TransactionsGet } from "./functions/transactions"

console.log("dinglestream")

AccountCreate({
    id: "1",
    username: "dingle",
    firstname: "Dingle",
    lastname: "Dangle",
});

AccountCreate({
    id: "2",
    username: "dingle2",
    firstname: "Dingle",
    lastname: "Dangle",
});

TransactionNew("1", "2", 10)

AccountDelete("1")

Bun.serve({
    async fetch(req) {
        const url = new URL(req.url);

        switch (url.pathname) {
            case "/":
                return new Response("dinglestream server")
            case "/accounts":
                return new Response("Please use /accounts/:id")
            case "/accounts/:id":
                return new Response(AccountCreate(url.searchParams.get("id")))
            case "/transactions/:id":
                return new Response(TransactionsGet(url.searchParams.get("id")))
            case "/transactions/new":
                return new Response(
                    TransactionNew(
                        url.searchParams.get("sender"),
                        url.searchParams.get("receiver"),
                        url.searchParams.get("amount"),
                        url.searchParams.get("description")
                    )
                )
            default:
                return new Response("404 Not Found", { status: 404 })
        }
    }
})