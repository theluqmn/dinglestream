import { AccountCreate, AccountDelete } from "./functions/accounts";

console.log("dinglestream");

AccountCreate({
    id: "1",
    username: "dinglestream",
    firstname: "Dingle",
    lastname: "Stream"
})

AccountDelete("1")