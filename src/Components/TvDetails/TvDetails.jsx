import axios from 'axios';
import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
let baseImageUrl = "https://image.tmdb.org/t/p/original/";
export default function TvDetails() {
    let params = useParams();
    const [tvDetail, setTvDetail] = useState(null);
    async function getTvDetail()
    {
        let {data} =await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
        setTvDetail(data);
        console.log(data)
    }
    useEffect(()=>{
        getTvDetail();
      }, []);
    
  return (
    <>
    {tvDetail? 
    <div className="container">
        <div className="col-md-12">
            <div>
                <h2 className='text-center'><span className='fw-bolder fs-1'>Title: </span>{tvDetail.title}</h2>
                <h3><span className='fw-bolder fs-3'>Overview: </span>{tvDetail.overview}</h3>
                <h3><span className='fw-bolder fs-3'>Popularity: </span>{tvDetail.popularity}</h3>
                <img className='w-75 detailsImg' src={baseImageUrl+ tvDetail.poster_path} alt='poster_Image'/>
            </div>
        </div>
    </div>:''}
    </>
  )
}
