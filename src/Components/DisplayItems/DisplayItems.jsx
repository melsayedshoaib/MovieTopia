import { Link } from 'react-router-dom'
import React from 'react'

export default function DisplayItems({item}) {
    return <>
        <div className="col-md-2">
            <Link className='text-decoration-none text-white' to={`/about/${item.id}/${item.media_type}`}>
            <div className='position-relative'>
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`} alt='poster' className='w-100 poster'></img>
                <h3 className='h6'>{item.title || item.name}</h3>
                {item.vote_average ? <div className='vote top-0 end-0 position-absolute p-1'>{ item.vote_average.toFixed(1)}</div> : ""}
            </div>
            </Link>
        </div>
    </>
}
