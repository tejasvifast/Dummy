import React from 'react'
import Page from './Page'
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'
import App from './App'

const App1 = () => {
  return (
    <div className='App1'>
      <Router>
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="/page" element={<Page/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App1
