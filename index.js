const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./dataBase/ConnectDb');
const Ask = require('./dataBase/Ask');
const Answer = require('./dataBase/Asnwer');
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

const connectDb = async () => {
    try {
        await connection.authenticate();
        console.log("Data Base Connect");
    } catch (error) {
        console.log(error);
    }
}

app.get("/", async (req, res) => {
    const data = await Ask.findAll({raw: true});
    if(data === null) {
        console.log(data);
    } else {
        res.render("index", {data});
    }
});

app.get("/answer/:id", async (req, res) => {
    const {id} = req.params;
    const data = await Ask.findOne({raw: true, where: {id}});
    const answers = await Answer.findAll({raw: true, where: {AskID: id}});
    res.render("answer", {data, answers});
});

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/answer", async (req, res) => {
    const {content, answerId} = req.body;
    try {
        await Answer.create({
            content: content,
            askID: answerId,
        });
        res.redirect("/answer/" + answerId);
        console.log("Data Save");
    } catch (e) {
        console.log(e);
    }
});

app.post("/ask", async(req, res) => {
    const {title, content} = req.body;
    try {
        await Ask.create({
            title: title,
            content: content,
        });
        res.redirect("/");
        console.log("Data Save");
    } catch(e) {
        console.log(e);
    }
});

app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
});

connectDb();
