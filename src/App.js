import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';

import Results from "./components/Results";
import Popup from "./components/Popup";


function App() {
  const [state, setState] = useState({
  // s: search query, results : ____ , selected: object related to movie clicked on
    s:"",
    results: [],
    selected: {}
  });
  const apiUrl= "http://www.omdbapi.com/?=tt3896198&apikey=73ffb10c";

  const search = (e) => {
    if (e.key === "Enter" ) {
      //use axios to access api s -search
      //destructure data 
      axios(apiUrl +"&s=" + state.s).then(({data})=> {
        let results = data.Search;

        setState(prevState => {
          return{...prevState, results: results}
        })
        // console.log(data);
      });
    }
  }


  // this is how we handle our value when we type
  const handleInput  = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return{...prevState, s: s}
    })
    // console.log(state.s); to check search query
  }


  const openPopup = id => {
    axios(apiUrl + "&i=" + id).then(({ data })=> {
      let result = data;

      console.log(result)

      setState(prevState => {
        return{...prevState, selected: result}
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return{...prevState, selected: {}}
    });
  }


  return (
    <div className="App">
      <header>
        <h1>Movie App</h1>
      </header>
        <main>
          <SearchBar 
          handleInput={handleInput} 
          search={search}
          />
          <Results results={state.results} openPopup={openPopup}/>

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> :false}

        </main>
    </div>
  );
}

export default App;
