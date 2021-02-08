// imports
const express = require('express');

const port = 3000;
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer')
var upload = multer();
var mysql = require('mysql');
const { request } = require('http');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const { strict } = require('assert');

const con = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'drogeria'
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.enable('strict routing');

app.use(
    session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    })
    )



/*
con.connect((err) => {
    if(err){ 
    throw err;}
    console.log("connected");
    var sql = ("INSERT INTO proizvodi (naziv, cena, sifra) VALUES ?");
    var values = [
        ['ornel','350', '111'],
        ['ariel','1200', '222'],
        ['rubel','450', '333'],
        ['persil','2100', '444'],
        ['merix','900', '555'],
        ['perwol','530', '666'],
        ['duel','300', '777'],
        ['bohor','285', '888'],

    ]
    con.query(sql,[values],(err,result)=>{
        if(err){
            throw err;
        }
        console.log('Number of records inserted' + result.affectedRows);
    });
});
*/

con.connect(err=>{
    if(err) throw err;
    console.log('connected');
})
 

// static files

app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/img',express.static(__dirname + 'public/img'));
app.use('/js',express.static(__dirname + 'public/js'));
//app.use('/form',express.static(__dirname + 'public/form')) Ovo ne treba neka ga kao podsetnik!


// set views
//app.set('views','./views');
app.set('view engine','ejs');

//FORMPAGE
app.get('/', (req,res)=>{ 
    
        res.render('form');

})

app.post('/form', function(request, response) {
    var email = request.body.email;
    var lozinka = request.body.lozinka;

    if (email && lozinka) {
// check if user exists
        con.query('SELECT * FROM korisnici WHERE email = ? AND lozinka = ?', [email, lozinka], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.user={
                    id:results[0].id,
                    email:results[0].email
                }
                response.redirect('home');
            } else {
                response.redirect('/');
            }           
            response.end();
        });
    } 
});
    


//HOMEPAGE
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.render('home',{
            page_name: 'home'
        });
        
    } else {
        response.send('Please login to view this page!');
    }
    //response.end();
});

app.get('/deteergents', (req,res) => {
    var user_email = req.session.user.email;
    var upit = "SELECT * FROM korisnici"
    if (req.session.loggedin) {
        var sql = "SELECT * FROM proizvodi;";
        con.query(sql, upit, (err, result) => {
            if(err) {
                res.status(500);
                return res.end(err.message)
            }
            res.status(200);
            res.render("deteergents", {proizvodi:result, user_email:user_email,korisnici:result,page_name:'deteergents'});
            return res.end();
        })
    }else {
        res.send('Please login to view this page!');
    }
})


app.get('/sapuni', (req,res)=>{
    if(req.session.loggedin){
    res.render('sapuni',{
        page_name: 'sapuni'
    });
}else{
    res.send('Please login to view this page!')
}
})

app.get('/samponi', (req,res)=>{
    if(req.session.loggedin){
    res.render('samponi',{
        page_name: 'samponi'
    });
}else{
    res.send('Please login to view this page!')
}
})

app.get('/novi_korisnik', (req, res) => {
    res.render('novi_korisnik');
})

app.post('/novi_korisnik', (req,res) => {
    
  
    var upit = "INSERT INTO korisnici(ime,prezime,broj_telefona,email,lozinka) VALUES (";

        upit+="'" + req.body.ime + "',";
        upit+="'" + req.body.prezime + "',";
        upit+="'" + req.body.broj_telefona + "',";
        upit+="'" + req.body.email + "',";
        upit+="'" + req.body.lozinka + "'";
        upit+=");";

    con.query(upit, (err,result)=>{
        if(err)
            {
                res.status(500);
                return res.end(err.message);
            }
            res.status(200);
            return res.redirect("/");
    })
})

app.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

app.get('/proizvod_izmena/:id' , (req,res) => {
    
    let sql = "SELECT * FROM proizvodi WHERE id="+req.params.id;
    con.query(sql, function(err, result) {
        if (err) {
        res.status(500);
        return res.end(err.message);
        }
        res.status(200);
        //result.forEach( function(row) {
        //res.write(row.id + '<br>');
        //})
    
      res.render('proizvod_izmena',{proizvodi: result, page_name:'deteergents'})
            
            
        return res.end();
        });
    
})

app.get('/novi_proizvod', (req,res) => {
    if(req.session.user.email == 'admin@gmail.com'){
    res.render('novi_proizvod', {
        page_name: 'deteergents'
    });
    }else{
        res.redirect('deteergents')
    }
})
app.post('/novi_proizvod', (req,res)=>{
    var sql = "INSERT INTO proizvodi(naziv, cena, sifra, img) VALUES ?"
    var values = [
        [req.body.naziv, req.body.cena,req.body.sifra,req.body.img]
    ]
    con.query(sql,[values], (err, result) => {
        if(err){
            res.status(500);
            return res.end(err.message);
        }   
        res.status(200);
        return res.redirect('/deteergents');
     })
})

app.post('/proizvod_izmena/:id', (req,res)=>{
    var sql = "UPDATE proizvodi SET naziv=? , cena=? , sifra =? , img=? WHERE id= ?"
  
    con.query(sql,[req.body.naziv, req.body.cena,req.body.sifra,req.body.img,req.params.id], (err, result) => {
        if(err){
            res.status(500);
            return res.end(err.message);
        }   
        res.status(200);
        return res.redirect('/deteergents');
     })
})

app.get('/korpa' , (req,res) => {
    
    let sql = "SELECT * FROM korpa WHERE korisnik_id=" + req.session.user.id;
    con.query(sql, function(err, result) {
        if (err) {
        res.status(500);
        return res.end(err.message);
        }
        res.status(200);
        //result.forEach( function(row) {
        //res.write(row.id + '<br>');
        //})
     
      res.render('korpa', {korpa: result, page_name: 'korpa', proizvodi:result})
            
            
        return res.end();
        });
    
})

app.post('/korpa/:id/:cena/:naziv', (req,res)=>{
    var id= req.params.id;
    var user_id = req.session.user.id;
    var cena = req.params.cena;
    var naziv = req.params.naziv;
    var sql = "INSERT INTO korpa(korisnik_id, proizvod_id, ukupna_cena, naziv_proizvoda) VALUES ?";
    var values = [
        [user_id,id,cena, naziv]
    ]
    con.query(sql,[values], (err,result)=>{
        if(err){
            res.status(500)
            return res.end(err.message)
        }
        res.status(200)
        return res.redirect('/deteergents');
    })
})

app.post('/korpa_brisanje/:id', (req,res)=>{
    
    var sql = "DELETE FROM korpa WHERE id=" +req.params.id;
    con.query(sql,(err,result)=>{
     if(err) throw err;
     
})
res.redirect('/korpa');
})
// listen on port 3000
app.listen(port, ()=>{
    console.info(`Listening on port ${port}`);
})