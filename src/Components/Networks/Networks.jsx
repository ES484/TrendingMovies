import React from 'react';
import {useContext } from 'react';
import { MediaContext } from './../MediaContext';
import { Link } from 'react-router-dom';

export default function Networks() {
  const {trendingNetworks, baseImageUrl} = useContext(MediaContext);

  return (
    <>
     {
        trendingNetworks?<div className='row'>
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
              <h5>{network.title}</h5>
            </div>
          </div>
        )}
      </div>:''
      }
    </>
  )
}
