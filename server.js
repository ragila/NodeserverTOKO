const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')


//Cara menggunakan package cors dan body pasrser

//untuk komunikasi antar server
app.use(cors());

//untuk membaca API yang kita buat dan membaca data yang dikirimkan si Client
app.use(bodyParser.json())

//Buat Database
//nedb database sederhana yang berbentuk java scriprt
const Datastore = require('nedb') //Membuat database 

//Auto membuat file db.json di 
const db = new Datastore({ filename: ".data/db.json", autoload: true })

app.get("/", (req, res) => {
    //proses
    res.send("ok")
})

// app.get("/api/data",(req, res) => {

// })

app.get("/api/data", (req, res) => {
    db.find({}, function (err, done) {
        if (err) {
            res.send("ini Erorr!!")
            return
        }
        res.send(done)
    })
})

app.post("/api/data/", (req, res) => {
    const data = {
        title: req.body.title,
        desc: req.body.desc
    }
    db.insert(data, (err, done) => {
        if (err) {
            res.send("erorr bro")
            return;
        }
        res.send(done)
    })
})


//kenapa id? kenapa ndak _id?
//because :id adalah sebuah nama parameter yang diisi bebas, yang penting itu setelah update harus disesuaikan. misal kita mau mengambil _id, namanya harus sama.
app.put('/api/data/:id', (req, res) => {

    console.log(req.body)
    const data = {
        "title": req.body.title,
        "desc": req.body.desc
    }

    db.update({ _id: req.params.id }, data, {}, function (err, numReplaced) {

        res.send('ok')
    });

});

app.delete('/api/data/:id', (req, res) => {
    db.remove({ _id: req.params.id }, {}, function (err, done) {
        res.send('ok')
    })
})



var listener = app.listen(8000, function () {
    console.log("server kamu di port " + listener.address().port)
})