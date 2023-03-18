import { useState, useEffect } from "react";
//import './Main.css';
import Appbar from './Appbar'
import { useNavigate } from 'react-router-dom'
import { map, get } from 'lodash'
import { getAllAddedWords, searchedWordDetail } from '../../actions/Mainpage/dictionary'
import React from "react"
import MUIDataTable from "mui-datatables";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import IpAddress from "./IpAddress";
import Weather from "./Weather";

function Main() {
  const [searchedWord, setSearchedWord] = useState('')
  const [lastSearchedWord, setLastSearchedWord] = useState('')
  const [allSearchedWords, setAllSearchedWord] = useState([])
  const [ButtonState, setButtonState] = useState({ 'first': 1, 'second': 0, 'third': 0 })
  const columns = [
    {
      name: "word",
      label: "Word",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "meaning",
      label: "Meaning",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "grammar",
      label: "Grammar",
      options: {
        filter: true,
        sort: false,
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
  };

  const columnsboot = [{
    dataField: 'word',
    text: 'Word',
    headerStyle: { width: '300px', height: '40px' }
  }, {
    dataField: 'meaning',
    text: 'Meaning',
    headerStyle: { width: '900px' }
  }, {
    dataField: 'grammar',
    text: 'Grammar',
    headerStyle: { width: '300px' }
  }];

  useEffect(() => {
    getAllAddedWords()
      .then((res) => {
        let data = get(res, 'data', [])
        setAllSearchedWord(data)
        setLastSearchedWord(data[data.length - 1])
      })
  }, [])

  const getData = (word) => {
    searchedWordDetail(word).then((res) => {
      let data = get(res, 'data', {})
      setSearchedWord(data)
    })
  }

  const navigate = useNavigate()
  const paginationOptions = {
    showTotal: true,
  };
  let optionForPagination = {
    page: 1, // Specify the current page. It's necessary when remote is enabled
    sizePerPage: 10, // Specify the size per page. It's necessary when remote is enabled
    //totalSize, // Total data size. It's necessary when remote is enabled
    pageStartIndex: 0, // first page will be 0, default is 1
    paginationSize: 3,  // the pagination bar size, default is 5
    showTotal: true, // display pagination information
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: '20', value: 20
    }, {
      text: 'All', value: allSearchedWords.length
    }], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
    withFirstAndLast: false, // hide the going to first and last page button
    alwaysShowAllBtns: true, // always show the next and previous page button
    firstPageText: 'First', // the text of first page button
    prePageText: 'Prev', // the text of previous page button
    nextPageText: 'Next', // the text of next page button
    lastPageText: 'Last', // the text of last page button
    nextPageTitle: 'Go to next', // the title of next page button
    prePageTitle: 'Go to previous', // the title of previous page button
    firstPageTitle: 'Go to first', // the title of first page button
    lastPageTitle: 'Go to last', // the title of last page button
    hideSizePerPage: false, // hide the size per page dropdown
    hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
    onPageChange: (page, sizePerPage) => { }, // callback function when page was changing
    onSizePerPageChange: (sizePerPage, page) => { }, // callback function when page size was changing
    //paginationTotalRenderer: (from, to, size) => { ... }  // custom the pagination total
    sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
      <div className="btn-group">
        {
          options.map((option) => (
            <button
              key={option.text}
              type="button"
              onClick={() => onSizePerPageChange(option.page)}
              className={`btn ${currSizePerPage === `${option.page}` ? 'btn-secondary' : 'btn-outline-secondary'}`}
            >
              {option.text}
            </button>
          ))
        }
      </div>
    )
  }

  const buttonStatefunction = (value) => {
    setButtonState({ [value]: 1 })
  }

  return (
    <>
      <Appbar onDoubleClick={getData} />
      <div className="Main pt-100" style={{ paddingTop: '70px', margin: '10px' }}>
        <div className="d-flex" style={{ display: "flex",justifyContent:'space-between' }}>
        <IpAddress></IpAddress>
        <Weather></Weather>
        </div>
        {searchedWord ? (<div className="searched-word" style={{ marginTop: '10px', marginBottom: '10px' }} >
          <h2>Searched Word</h2>
          <h4>Word : {searchedWord.word}</h4>
          <p>Meaning : {searchedWord.meaning}</p>
          <p>Grammar : {searchedWord.grammar}</p>
        </div>) : (<div className="searched-word" style={{ marginTop: '10px', marginBottom: '10px' }} >
          <h2>Last Searched Word</h2>
          <h4>Word : {lastSearchedWord.word}</h4>
          <p>Meaning : {lastSearchedWord.meaning}</p>
          <p>Grammar : {lastSearchedWord.grammar}</p>
        </div>)
        }
        <div className="d-flex justify-content-between">
          <button onClick={() => buttonStatefunction('first')}>BootstrapTable</button>
          <button onClick={() => buttonStatefunction('second')}>MUIDataTable</button>
          <button onClick={() => buttonStatefunction('third')}>ClassicalButton</button>
        </div>
        {ButtonState['first'] && <div style={{ marginBottom: '20px', borderRadius: '5px' }}>
          <h2 style={{ backgroundColor: '#06721f' }}>React BootstrapTable Data</h2>
          <BootstrapTable
            keyField='id'
            wrapperClasses='custom-row-class-2 pagination-style'
            data={allSearchedWords}
            columns={columnsboot}
            bordered={true}
            headerClasses='bootstrap-header'
            rowClasses="bootstrap-row"
            striped
            hover
            //rowStyle={ { backgroundColor: 'aquamarine' ,width:'100vh'} }
            pagination={paginationFactory(optionForPagination)}
          >
          </BootstrapTable>
        </div>}
        {ButtonState.second &&
          <>
            <h2 style={{ backgroundColor: '#06721f' }}>MUI Tabular Data</h2>
            <MUIDataTable
              title={"Employee List"}
              data={allSearchedWords}
              columns={columns}
              options={options}
            />
          </>
        }
        {ButtonState.third && <div>
          <h2 style={{ backgroundColor: '#06721f' }}>Button Tabular Data</h2>
          <div className="buttontabledata" >
            {map(allSearchedWords, (el) => {
              return (
                <div >
                  <button style={{ width: '100%' }} name="word" value={el.word} onClick={(e) => {
                    navigate('/Page', {
                      state: {
                        word: el.word
                      }
                    })
                  }} >
                    {el.word} <br></br>{el.meaning}<br></br> {el.grammar}
                  </button>
                </div>
              )
            })}
          </div>
        </div>}
      </div>
    </>
  );
}

export default Main;