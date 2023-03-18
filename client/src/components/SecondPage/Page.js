import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchedWordDetail } from "../../actions/Mainpage/dictionary";
import { get } from 'lodash'


function Page() {
  const location = useLocation()
  const [vocab, setVocab] = useState({})

  useEffect(() => {
    searchedWordDetail(location.state.word).then((res) => {
      let data = get(res, 'data', {})
      setVocab(data)
    })
  }, [])

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