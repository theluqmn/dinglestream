import { AccountCreate, AccountDelete } from "./functions/accounts";
import { TransactionNew } from "./functions/transactions";

console.log("dinglestream");

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

TransactionNew("1", "2", 10, "test");