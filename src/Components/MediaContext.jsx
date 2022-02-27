import { createContext } from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
export let MediaContext = createContext([]);
export function MediaContextProvider(props)
{
    const [trendingMovies, setTrendingMovies]= useState([]);
    const [trendingTvShows, setTrendingTvShows]= useState([]);
    const [trendingTvPerson, setTrendingPerson]= useState([]);
    const [trendingNetworks, setTrendingNetworks]= useState([]);
    let baseImageUrl = "https://image.tmdb.org/t/p/original/";
    async function getTrendingItems(mediaType, callback)
  {
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
    console.log(data.results);
    callback(data.results);
  }
  useEffect(()=>{
    getTrendingItems("movie", setTrendingMovies);
    getTrendingItems("tv", setTrendingTvShows);
    getTrendingItems("person", setTrendingPerson);
    getTrendingItems("networks", setTrendingNetworks);
  }, []);
    return <MediaContext.Provider value={{trendingMovies, trendingTvShows, trendingTvPerson, trendingNetworks, baseImageUrl}}>
        {props.children}
    </MediaContext.Provider>
}