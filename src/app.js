const express = require("express");
let app = express();
const doteve = require("dotenv");
doteve.config();
const users = require("../models/users");
const contacts = require("../models/contacts");


console.log(process.env.PORT);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hey this is the basic contact app");
});

app.post("/registerUser", async(req, res) => {
    let data = await users.registerUsers(req.body);
    res.send(data);
});

app.put("/updateUser", async(req, res) => {
    let userId = req.body.id;
    let data = await users.updateUser(userId, req.body);
    
    res.send(
        {
            "msg":"updated"
        }
    );
});

//login data
app.get("/login", async(req, res) => {
    let data = await users.loginUser(req.body);

    if (data) {
        res.send({
            auth: true,
            access_token: data,
            msg: "done!",
        });
    } else {
        res.send({ msg: "Invalid UserName and Password" });
    }
});

//using midleware verifying contact
app.post("/addContacts", users.verificationUsers, async(req, res) => {
    if (res.locals.isAuthenticated) {
        console.log(req.body);
        let userId = res.locals.userid;
        await contacts.addContact(req.body, userId);
        res.send("Verified Successfully");
    } else {
        res.send("Authentication Failed");
    }
});

//get contact data by name
app.get("/getContacts", users.verificationUsers, async(req, res) => {
    if (res.locals.isAuthenticated) {
        let userName = req.body.name;
        let userId = res.locals.userid;
        let data = await contacts.getContacts(userName, userId);
        res.send(data);
    } else {
        res.send("Authenticated Fail");
    }
});

//update contact data by name
app.put("/updateContacts", users.verificationUsers, async(req, res) => {
    if (res.locals.isAuthenticated) {
        let userName = req.body.name;
        let userId = res.locals.userid;
        let data = await contacts.updateContacts(req.body,userName,userId);
        res.send(data);
    } else {
        res.send("Authenticated Fail");
    }
});

//delete contact by name
app.delete("/deleteContacts", users.verificationUsers, async(req, res) => {
    if (res.locals.isAuthenticated) {
        let userName = req.body.name;
        let userId = res.locals.userid;
        let data = await contacts.deleteContacts(userName, userId);
        res.send(data);
    } else {
        res.send("Authenticated Fail");
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Hello port ir running on ${process.env.PORT}`);
});