const mongoose = require('mongoose')
const axios = require('axios')

const dictionaryModel = require('../models/vocabModel')

const addToDB = async function(req, res){
    try{
        let wordId = req.body.word
        const options = {
            url: 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + wordId,
            method: "GET",
            headers: {
                'app_id': "4a51c068",
                'app_key': "a2b40847201ae0e81088d0df244a0a08" 
            }
        };
        let result = await axios(options)
        var result1=result.data.results[0].lexicalEntries[0].entries[0].senses[0]
        let result2=result.data.results[0].lexicalEntries[0].lexicalCategory.text 
        if(result1.hasOwnProperty('crossReferenceMarkers')){
            result1=result.data.results[1].lexicalEntries[0].entries[0].senses[0].definitions[0]
        }
        else{
            result1=result.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
        }
        let obj={}
        obj.word = wordId
        if(result1!==undefined) obj.meaning=result1
        if(result2!==undefined) obj.grammar=result2
        const dictionary = await dictionaryModel.create(obj)
        console.log(obj,"obj***********");
        //send an alert via frontend "word added to your vocabulary"
    }
    catch(err){
        return res.status(500).send({ status: false, msg: "Error", error: err.message });
    }
}

module.exports = {addToDB}