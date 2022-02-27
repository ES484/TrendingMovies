import React from 'react';
import {useContext } from 'react';
import { MediaContext } from './../MediaContext';
import { Link } from 'react-router-dom';
export default function Home() {
  const {trendingMovies, trendingTvShows, trendingTvPerson, trendingNetworks, baseImageUrl} = useContext(MediaContext)
  return (
    <>
    {
      trendingMovies && trendingTvShows && trendingTvPerson && trendingNetworks?
      <>
      <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className="w-25 brdr mb-3"></div>
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched movies by day</p>
            <div className="mb-3 brdr"></div>
          </div>
        </div>
        {trendingMovies.map((movie, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
              <Link to={`/movieDetails/${movie.id}`}>
                <img className='img-fluid' src={baseImageUrl+ movie.poster_path} alt='poster_Image'/>
                <h5>{movie.title}</h5>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className="w-25 brdr mb-3"></div>
            <h2>Trending</h2>
            <h2>Tv shows</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched tvShows by day</p>
            <div className="mb-3 brdr"></div>
          </div>
        </div>
        {trendingTvShows.map((tv, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
            <Link to={`/tvDetails/${tv.id}`}>
                <img className='img-fluid' src={baseImageUrl+ tv.poster_path} alt='poster_Image'/>
                <h5>{tv.name}</h5>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className="w-25 brdr mb-3"></div>
            <h2>Trending</h2>
            <h2>Tv People</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched People by day</p>
            <div className="mb-3 brdr"></div>
          </div>
        </div>
        {trendingTvPerson.map((person, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
            <Link to={`/peopleDetails/${person.id}`}>
                <img className='img-fluid' src={baseImageUrl+ person.profile_path} alt='poster_Image'/>
                <h5>{person.name}</h5>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className='row'>
        <div className="col-md-4 d-flex align-items-center">
          <div className='w-100'>
            <div className="w-25 mb-3 brdr mb-3"></div>
            <h2>Trending</h2>
            <h2>Tv Networks</h2>
            <h2>To watch now</h2>
            <p className='secondColor'>Most watched Networks by day</p>
            <div className="mb-3 brdr"></div>
          </div>
        </div>
        {trendingNetworks.map((network, index)=>
          <div className='col-md-2 my-3' key={index}>
            <div>
              <img className='img-fluid' src={baseImageUrl+ network.poster_path} alt='poster_Image'/>
              <h5>{network.name||network.title}</h5>
            </div>
          </div>
        )}
      </div>  
      </>:<div className='w-100 vh-100d-flex justify-conetnt-center align-items-center'><div><i className='fas- fa-spinner text-white'></i></div></div>
    }
    </>
  )
}
