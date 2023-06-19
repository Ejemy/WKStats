const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const auth = require("./public/js/authenticate.js")

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.render("login", {error: ""})
})

app.post("/login", async (req,res) => {
    try{
        const authen = await auth(req.body.token)
        var user = encodeURIComponent(authen.username)
        return res.redirect("/user?user=" + user + "&token=" + req.body.token)
    }
    catch(error){
        console.log(error)
        return res.render("login", {error: "Token incorrect."})
    }
})

app.get('/user' , (req, res) => {
    res.render("main", {title: req.query.user, token: req.query.token})
})

app.listen(port, ()=> {
    console.log("Express running on port:", port)
})
