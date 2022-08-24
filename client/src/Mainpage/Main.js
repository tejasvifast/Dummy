import {useState, useEffect} from "react";
//import logo from './logo.svg';
import './Main.css';
import Appbar from './Appbar'
import {useNavigate } from 'react-router-dom'



function Main() {  
  const [dictionaries, setWords] = useState([
    {
      word: '',
      meaning: '',
      grammar:''
    }
  ])
  const [vocab, setVocab] = useState([
    {
      word: '',
      meaning: '',
      grammar:''
    }
  ])

  useEffect(() => {
    fetch('/getAddedWords').then(res => {
      if(res.ok){
        return res.json()
      }
    }).then(jsonRes => setVocab(jsonRes))
  })
  
  const getData =(data)=>{
    const newWord = {
      word: data
    }
   fetch("/Dictionary", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newWord)
   }).then((res)=>{
    if(res.ok){
      return res.json()
    }
   }).then(jsonRes => setWords(jsonRes))
  }

 const navigate = useNavigate()

  return (
    <div className="Main">
      <Appbar onDoubleClick = {getData}/>
      <h1>Vocab</h1>
      <h1>word :-- {dictionaries.word}</h1>
      <p>meaning : {dictionaries.meaning}</p>
      <p>grammar : {dictionaries.grammar}</p>
      
      {/* <Link >go to page</Link> */}
      {vocab.map(movie => {
        return(
         
        <div >
           {/* <Page word={movie.word}/> */}
          <button style={{width: '100%'}}  name="word" value={movie.word} onClick={(e)=>{navigate('/Page',{
            state:{
              word:movie.word
            }
          })}} >
            
              { movie.word} <br></br>{movie.meaning}<br></br> {movie.grammar}
              {/* <Page word={}/> */}
              
          </button> 
          
          
          {/* <button>DELETE</button> */}
        </div>
        )
      })}

    </div>
  );
}

export default Main;