var express = require('express');
var app = express()
var bodyParser = require('body-parser')
var path = require('path'); 
var hbs = require('hbs')
var cookieParser = require('cookie-parser')

var utils = require('./utils/utils.js')
var auth = require('./middleware/auth')

app.use(bodyParser.urlencoded({
    extended: true
})) // For understanding form data
app.use(cookieParser())
app.use(express.json())

const publicDirPath = path.join(__dirname,'/public/');// locating the public directory, used for static stuff
const viewDir = path.join(__dirname,'/templates/views'); // locating view directory used by handlebars (hbs) to locate its files to render
const partialsPath = path.join(__dirname,'/templates/partials'); // locating partial directory again used by handlebars again.

app.set('views',viewDir); //telling express, where to find views directory #Bridge
app.set('view engine','hbs'); // needed to set-up to let express know which engine are we using and also for hbs, all the content is supposed to go in views folder!
hbs.registerPartials(partialsPath); // register hbs partials    

app.use(express.static(publicDirPath)); 

app.get('/', (req,res)=>{
    res.render('landing',{})
})

app.get('/login', (req,res)=>{
    res.render('login', {})
})

app.post('/login', (req,res)=>{
    var user = utils.login(req.body)

    res.cookie('token', req.body.userName)

    res.render('links', user)
})

app.get('/register', (req,res)=>{
    res.render('register', {})
})

app.post('/register', (req,res)=>{
    utils.register(req.body)

    res.cookie('token', req.body.userName)

    res.redirect('/links')
})

app.get('/links', (req,res)=>{
    res.render('links', {})
})

// Accepting Links from link page
app.post('/links', (req,res)=>{
    var a = req.body.links
    if (a=="register"){
        res.render('register', {})
    }
    else if(a== "login"){
        res.render('login', {})
    }
    else if(a=="reportAProblem"){
        res.render('reporting', {})
    }else {
        res.redirect('/');
    }
})

app.get('/reporting', (req,res)=>{
    res.render('reporting', {})
})

app.post('/reporting', auth, (req,res)=>{
    utils.problems(req.body)
    res.redirect('/links')  
})

app.get('/logout', (req,res)=>{
    res.clearCookie('token');
    res.render('links', {})
})

app.listen(8080,()=>{
    console.log('Server listening at port 8080')
})