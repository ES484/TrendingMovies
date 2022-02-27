import axios from 'axios';
import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
let baseImageUrl = "https://image.tmdb.org/t/p/original/";
export default function MovieDetails() {
    let params = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    async function getMovieDetail()
    {
        let {data} =await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
        setMovieDetail(data);
    }
    useEffect(()=>{
        getMovieDetail();
      }, []);
    
  return (
    <>
    {movieDetail? 
    <div className="container">
        <div className="col-md-12">
            <div>
                <h2 className='text-center'><span className='fw-bolder fs-1'>Title: </span>{movieDetail.title}</h2>
                <h3><span className='fw-bolder fs-3'>Overview: </span>{movieDetail.overview}</h3>
                <h3><span className='fw-bolder fs-3'>Popularity: </span>{movieDetail.popularity}</h3>
                <img className='w-75 detailsImg' src={baseImageUrl+ movieDetail.poster_path} alt='poster_Image'/>
            </div>
        </div>
    </div>:''}
    </>
  )
}
