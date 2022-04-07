const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
    const text =
        "Hi! You're on Kyoyu. Click new to create a new document and share it with others.";

    res.render("display", { text, language: "plaintext" });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/save", async (req, res) => {
    // try {
    //     const value = req.body.value;
    //     console.log(value);
    // } catch (error) {
    //     console.log("Value is undefined");
    // }
    const value = req.body.value;
    try {
        const document = await Document.create({ value });
        res.redirect(`${document.id}`);
    } catch (error) {
        res.render("new", { value });
    }
});

app.get("/:id/duplicate", async (req, res) => {
    const id = req.params.id;
    try {
        const document = await Document.findById(id);
        res.render("new", { value: document.value });
    } catch (error) {
        res.redirect(`/${id}`);
    }
});

app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const document = await Document.findById(id);

        res.render("display", { text: document.value, id });
    } catch (error) {
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000);
