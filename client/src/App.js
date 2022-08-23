import {useState, useEffect} from "react";
//import logo from './logo.svg';
import './App.css';
import Appbar from './Appbar'
//import axios from "axios";
import {Link,useNavigate } from 'react-router-dom'
import Page from "./Page";



function App() {  
  // const navigate = useNavigate()
  //code to take response from backend to show on frontend
  const [dictionaries, setWords] = useState([
    {
      word: '',
      meaning: '',
      grammar:''
    }
  ])
  //for get api
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
    // alert(`this is ${data}`)
    const newWord = {
      word: data
    }
    //alert(`movie added ${JSON.stringify(newWord)} abc`);
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

  const [voca, setVoca] = useState([
    {
      word: '',
    }
  ])

  // const handleChange = (e) =>{
  //   setVoca(e.target.value)
  // }

  function handleChange(e){
    const {name, value} = e.target;
    setVoca(prevInput => {
      return(
        {
          ...prevInput,
          [name] : value
        }
      )
    })
  }
  
  // function handleChange(e){
  //   const {name, value} = e.target;
  //   setVoca(e.target.value)
  // }

  function showMe(e){
    e.preventDefault()
    // alert("movie added");
    const newWord = {
      word: voca.word
    }
    console.log(newWord)
    alert(`movie added ${JSON.stringify(e.target.value)} abc`);
   // axios.post("/newmovie", newMovie)
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
  //  }).then(jsonRes => setWords(jsonRes))
  }

  // const navigateHome =() =>{
  //   navigate('/Page')
  // }
 const navigate = useNavigate()
//  const navigateHome =(e) =>{
//     alert(e.target.value)
//     navigate('/Page',{
//       state:{
//         hi:"kino"
//       }
//     })
// }

  return (
    <div className="App">
      <Appbar onDoubleClick = {getData}/>
      <h1>Vocab</h1>
      <h1>word : {dictionaries.word}</h1>
      <p>meaning : {dictionaries.meaning}</p>
      <p>grammar : {dictionaries.grammar}</p>
      
      {/* <Link >go to page</Link> */}
      {vocab.map(movie => {
        return(
         
        <div >
           {/* <Page word={movie.word}/> */}
          <button style={{width: '100%'}}  name="word" value={movie.word} onChange={handleChange} onClick={(e)=>{navigate('/Page',{
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

export default App;



  //code to take request.body from frontend for my backend

  // const [dictionary, setWord] = useState(
  //   {
  //     word: ''
  //   }
  // )

  //using get api of backend to fetch the document stored in db
  // useEffect(() => {
  //   fetch('/movies').then(res => {
  //     if(res.ok){
  //       return res.json()
  //     }
  //   }).then(jsonRes => setMovies(jsonRes))
  // })

  

  // function handleChange(e){
  //   const {name, value} = e.target;
  //   setWord(prevInput => {
  //     return(
  //       {
  //         ...prevInput,
  //         [name] : value
  //       }
  //     )
  //   })
  // }

  
//to initialise the post backend api using axios/fetch to create document on click of button
  // function searchWord(e){
  //   e.preventDefault()
  //   // alert("movie added");
  //   const newWord = {
  //     word: dictionary.word
  //   }
  //   alert(`word found ${JSON.stringify(newWord)}`);
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
  //  }).then(jsonRes => setWords(jsonRes))
  // }
