import React from 'react'
import Page from './components/SecondPage/Page'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Main from './components/Mainpage/Main'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/page" element={<Page/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
