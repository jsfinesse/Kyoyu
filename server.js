const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    const text =
        "Hi! You're on Kyoyu. Click new to create a new document and share it with others.";

    res.render("display", { text });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port:" + 3000);
});
