/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout'
import {apiGet} from '../misc/config';
import { useLastQuerry } from '../misc/Custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from '../components/CustomRadio';

// eslint-disable-next-line arrow-body-style
const Home = () => {
    const [input, setInput] = useLastQuerry();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows';


    const onSearch = () =>{
        // https://api.tvmaze.com/search/shows?q=men  
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
        })
     }

    const onInputChange = ev => {
        setInput(ev.target.value);
    }
    

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13){
            onSearch()
        }
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }
    console.log(searchOption);
    
    const renderResults = () => {
        if(results && results.length === 0){
           return<div>No Results</div>
        }
        if(results && results.length > 0){
           return results[0].show  ? (
           <ShowGrid data = {results} />
            ) : (
                <ActorGrid  data = {results}/>
            )
        }
        return null;
    }
   
    return (
        <MainPageLayout>
            <SearchInput 
            type ="text"
            placeholder="search for something"
             onChange={onInputChange}
              onKeyDown={ onKeyDown }
              value= {input}
              />

             <RadioInputsWrapper>
                <div>
                 <CustomRadio 
                 label = "Shows"
                 id="shows-search" 
                 value="shows"
                 checked={isShowsSearch} 
                 onChange={onRadioChange}
                 />
                </div>

                <div>
                <CustomRadio 
                 label = "Actors"
                 id="actors-search" 
                 value="people"
                 checked={!isShowsSearch} 
                 onChange={onRadioChange}
                 />
                </div>
                
             </RadioInputsWrapper>
            <SearchButtonWrapper>
            <button type ="button" onClick={onSearch}>
                Search
            </button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
