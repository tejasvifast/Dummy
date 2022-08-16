import {useState, useEffect} from "react";
//import logo from './logo.svg';
import './App.css';
import Appbar from './Appbar'
import Demo from './Demo'
//import axios from "axios";


function App() {  
  //code to take response from backend to show on frontend
  const [dictionaries, setWords] = useState([
    {
      word: '',
      meaning: '',
      sentence:''
    }
  ])


  //code to take request.body from frontend for my backend

  const [dictionary, setWord] = useState(
    {
      word: ''
    }
  )

  //using get api of backend to fetch the document stored in db
  // useEffect(() => {
  //   fetch('/movies').then(res => {
  //     if(res.ok){
  //       return res.json()
  //     }
  //   }).then(jsonRes => setMovies(jsonRes))
  // })

  function handleChange(e){
    const {name, value} = e.target;
    setWord(prevInput => {
      return(
        {
          ...prevInput,
          [name] : value
        }
      )
    })
  }

  
//to initialise the post backend api using axios/fetch to create document on click of button
  function searchWord(e){
    e.preventDefault()
    // alert("movie added");
    const newWord = {
      word: dictionary.word
    }
    alert(`movie added ${JSON.stringify(newWord)} abc`);
   // axios.post("/newmovie", newMovie)
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

  return (
    <div className="App">
      <Appbar onChange={handleChange} name="word" value={dictionary.word}/>
      <h1>Vocab</h1>
      <Demo/>
      <form>
        <input onChange={handleChange} name="word" value={dictionary.word}></input>
        
        <button onClick={searchWord}>SEARCH</button>
      </form>
      <h1>word = {dictionaries.word}</h1>
      <p>meaning = {dictionaries.meaning}</p>
      <p>sentence = {dictionaries.sentence}</p>
    </div>
  );
}

export default App;

// {movies.map(movie => {
//   return(
//     <div>
//        <h1>{movie.title}</h1>
//        <p>{movie.genre}</p>
//        <p>{movie.year}</p>
//        {/* <p>Hiii</p> */}
//        <button>DELETE</button>
//       </div>
//   )
// })}
