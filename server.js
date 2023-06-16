const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const auth = require("./public/js/authenticate.js")

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.use(express.static('public'));
app.get("/", (req,res)=>{
    res.render("login", {error: ""})
})

app.post("/login", async (req,res) => {
    try{
        const authCheck = await auth(req.body.token)
        console.log(authCheck)
        return res.redirect("/home")
    }
    catch(error){
        console.log(error)
        return res.render("login", {error: "Token incorrect."})
    }
})

app.get('/home', (req, res) => { 
    res.render("main", {title: "You"})
})

app.listen(port, ()=> {
    console.log("Express running on port:", port)
})
