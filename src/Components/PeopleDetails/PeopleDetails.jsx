import axios from 'axios';
import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
let baseImageUrl = "https://image.tmdb.org/t/p/original/";
export default function PeopleDetails() {
    let params = useParams();
    const [peopleDetail, setPeopleDetails] = useState(null);
    async function getPeopleDetails()
    {
        let {data} =await axios.get(`https://api.themoviedb.org/3/person/${params.id}?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
        setPeopleDetails(data);
        console.log(data)
    }
    useEffect(()=>{
      getPeopleDetails();
      }, []);
    
  return (
    <>
    {peopleDetail? 
    <div className="container">
        <div className="col-md-12">
            <div>
                <h2 className='text-center'><span className='fw-bolder fs-1'>Title: </span>{peopleDetail.name}</h2>
                <h3><span className='fw-bolder fs-3'>Overview: </span>{peopleDetail.biography}</h3>
                <h3><span className='fw-bolder fs-3'>Popularity: </span>{peopleDetail.popularity}</h3>
                <img className='w-75 detailsImg' src={baseImageUrl+ peopleDetail.profile_path} alt='poster_Image'/>
            </div>
        </div>
    </div>:''}
    </>
  )
}
