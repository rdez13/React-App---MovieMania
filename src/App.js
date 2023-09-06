import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';


const API_URL = 'http://www.omdbapi.com?apikey=4c0a9785';



const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

   

    const searchMovies = async (title) => {
        //call to api
        const completeURL = API_URL + "&s=" + title;
        const response = await fetch(completeURL);
        //(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data)
        setMovies(data.Search);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
        searchMovies(searchTerm);
        }
      };

    useEffect(() => {
        searchMovies("iron man");
    }, [])

   

    return(
        <div className="app">
           <h1>MovieMania</h1> 

           <div className="search">
            <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search for movies"
                />
            <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
            />
           </div>

            {movies?.length > 0 ?(
                <div className="container">
                    { movies.map((movie) => {
                        return <MovieCard movie={movie} />
                    })}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>                    
                </div>
            )}
        </div>
    );
};

export default App;