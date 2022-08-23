import React from "react";
import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";


function Page() {  

    const location =useLocation()
    const [vocab, setVocab] = useState(
        {
          word: '',
          meaning: '',
          grammar:'',
          origin:''
        }
      )

      useEffect(() => {
        fetch("/wordDetails", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(location.state)
         }).then((res)=>{
          if(res.ok){
            return res.json()
          }
         }).then(jsonRes => setVocab(jsonRes))
        }
      )
  
  return (
    <div className="Page">
            <h1>{vocab.word}</h1>
            <p>{vocab.grammar}</p>
            <p>{vocab.meaning}</p>
            <p>Origin:{vocab.origin}</p>
    </div>
  );
}

export default Page;

// {vocab.map(movie => {
//   return(
   
//   <div >
    
//     <button style={{width: '100%'}}  name="word" value={movie.word} onClick={navigateHome}>
      
//         { movie.word} <br></br>{movie.meaning}<br></br> {movie.grammar}
//         {/* <Page word={}/> */}
//     </button> 
    
//     {/* <button>DELETE</button> */}
//   </div>
     
//   )
// })}