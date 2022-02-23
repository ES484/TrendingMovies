import React from 'react';
import axios from 'axios';
import style from './Home.module.css';
import { useEffect, useState } from 'react';
export default function Home() {
  let [trendingMovies, setTrendingMovies]= useState([]);
  let [trendingTvShows, setTrendingTvShows]= useState([]);
  let [trendingTvPerson, setTrendingPerson]= useState([]);
  let [trendingNetworks, setTrendingNetworks]= useState([]);
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
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className={`w-25 ${style.brdr} mb-3`}></div>
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched movies by day</p>
            <div className={`mb-3 ${style.brdr}`}></div>
          </div>
        </div>
        {trendingMovies.map((movie, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
              <img className='img-fluid' src={baseImageUrl+ movie.poster_path} alt='poster path'/>
              <h5>{movie.title}</h5>
            </div>
          </div>
        )}
      </div>
      <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className={`w-25 ${style.brdr} mb-3`}></div>
            <h2>Trending</h2>
            <h2>Tv shows</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched tvShows by day</p>
            <div className={`mb-3 ${style.brdr}`}></div>
          </div>
        </div>
        {trendingTvShows.map((tv, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
              <img className='img-fluid' src={baseImageUrl+ tv.poster_path} alt='poster path'/>
              <h5>{tv.name}</h5>
            </div>
          </div>
        )}
      </div>
       <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className={`w-25 ${style.brdr} mb-3`}></div>
            <h2>Trending</h2>
            <h2>Tv People</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched People by day</p>
            <div className={`mb-3 ${style.brdr}`}></div>
          </div>
        </div>
        {trendingTvPerson.map((person, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
              <img className='img-fluid' src={baseImageUrl+ person.profile_path} alt='profile_path'/>
              <h5>{person.name}</h5>
            </div>
          </div>
        )}
      </div>
      <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className={`w-25 ${style.brdr} mb-3`}></div>
            <h2>Trending</h2>
            <h2>Tv Networks</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched Networks by day</p>
            <div className={`mb-3 ${style.brdr}`}></div>
          </div>
        </div>
        {trendingNetworks.map((network, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
              <img className='img-fluid' src={baseImageUrl+ network.poster_path} alt='profile_path'/>
              <h5>{network.title}</h5>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
