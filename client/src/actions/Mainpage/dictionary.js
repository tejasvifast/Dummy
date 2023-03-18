import axios from 'axios'
import { apiUrl } from '../../index'

export const getAllAddedWords=()=>{
    const config={}
    const data = axios.get(`${apiUrl}getAddedWords`,config)
    return data
}

export const searchedWordDetail=(word)=>{
    const config={
        headers:{
            'Content-Type': 'application/json'
        },
        params:{
            word:word
        }
    }
    const data=axios.post(`${apiUrl}Dictionary`,{},config)
    return data
}

    // fetch('/getAddedWords').then(res => {
    //   if(res.ok){
    //     return res.json()
    //   }
    // }).then(jsonRes => setVocab(jsonRes))


    // fetch("/wordDetails", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(location.state)
    //    }).then((res)=>{
    //     if(res.ok){
    //       return res.json()
    //     }
    //    }).then(jsonRes => setVocab(jsonRes))

    //   console.log(data,"data>>>>>>>>>>>")
  //   const newWord = {
  //     word: data
  //   }
  //  fetch("/Dictionary", {
  //   method: "POST",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(newWord)
  //  }).then((res)=>{
  //   if(res.ok){
  //     return res.json()
  //   }
  //  }).then(jsonRes => setSearchedWord(jsonRes))