const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const mongoose = require('mongoose')
const axios = require('axios')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

mongoose.connect("mongodb+srv://pragya_user1:tfr9Y2SlmidKsL1L@cluster0.e7bog.mongodb.net/Express-React", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// const movieName = mongoose.model("Movie", movieSchema);

const dictionarySchema = new mongoose.Schema({
    word: String,
    meaning: String,
    sentence: String
})
const dictionaryModel = mongoose.model("Word", dictionarySchema);

app.post('/Dictionary', async function (req, res) {
    try {
        let wordId = req.body.word
        console.log(wordId,">>>>>>>>>>>>.");
        let findWordinCache = await dictionaryModel.findOne({word: wordId}).select({_id:0,word:1,meaning:1,sentence:1})
        if(findWordinCache) return res.status(200).send(findWordinCache)
        // let fields = "pronunciations"
         //let strictMatch = "false"
        const options = {
            host: 'od-api.oxforddictionaries.com',
            port: '443',
            // url: "https://od-api.oxforddictionaries.com/api/v2/",
            url: 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + wordId ,//+  '&strictMatch=' + strictMatch,
            method: "GET",
            headers: {
                'app_id': "4a51c068",
                'app_key': "a2b40847201ae0e81088d0df244a0a08" //	https://od-api.oxforddictionaries.com/api/v2
            }
        };

        let result = await axios(options)

        let result1=result.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
        let result2=result.data.results[0].lexicalEntries[0].entries[0].senses[0].examples

        let obj={}
        obj.word = wordId
        if(result1!==undefined) obj.meaning=result1
        if(result2!==undefined) obj.sentence=result2[0].text
        const dictionary = await dictionaryModel.create(obj)
        console.log(obj,"obj***********");
        res.status(201).send(obj)
    
    }
    catch (err) {
        if(err.message=="Request failed with status code 404") return res.status(404).send({ status: false, msg: "Not found" })
        res.status(500).send({ status: false, msg: "Error", error: err.message });
    }
})

app.get("/movies", async function (req, res) {
     await movieName.find().then(movies => res.json(movies));

})

app.post("/newmovie", async function(req, res){
    const title = req.body.title;
    const genre = req.body.genre;
    const year = req.body.year;

    if(year!=2019) return res.status(400).send({msg:"provide year 2019"})

    const newMovie = {}

    newMovie.title = title
    newMovie.genre = genre
    newMovie.year = year
    let create = await movieName.create(newMovie)
    res.send({data: create})


    //     let movie = new movieName({
    //         title: "Shaheed",
    //         genre: "Patriotic",
    //         year: "1999"
    //     })

    //    movie.save()

})

app.listen(port, function(){
    console.log("express is running");
})