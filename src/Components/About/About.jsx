import React, { Fragment, useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import axios from 'axios'
import {useParams} from 'react-router-dom'

export default function About() {
  const [loading, setLoading] = useState(false);
  let { id, media_type } = useParams();
  const [details, setDetails] = useState({});
  async function getDetails(id, media_type) {
    setLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=f55aad1e521f26e2201c9c89a99d2050&language=en-US`)
    setLoading(false);
    setDetails(data);
  }
  useEffect(() => {
    getDetails(id, media_type);
  }, [id, media_type])
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
      </Helmet>
      <div className="container">
        {loading ? <div className="loader-container">
      <div className="spinner"></div>
        </div>: <div className="container">
        <div className="row">
          <div className="col-md-3">
            {details.poster_path || details.profile_path ? <img src={`https://image.tmdb.org/t/p/w500${details.poster_path || details.profile_path}`} alt='poster' className='w-100 poster'></img> : <img src={ "https://variety.com/wp-content/uploads/2013/10/film-placeholder.jpg"} width={300} height={400} alt='poster' />}
          </div>
          <div className="col-md-6">
            <div>
                <h2>{details.title || details.name}</h2>
              <p className='text-muted my-3'>{details.overview || details.biography}</p>
              {details.vote_average ? <h4>Vote Average : { details.vote_average.toFixed(1)}</h4> : ""}
              {details.vote_count ? <h4>Vote Count : {details.vote_count.toFixed(1)}</h4> : ""}
              {details.origin_country ? <p>Origin Country: { details.origin_country}</p> : ""}
              {details.original_language ? <p>Original Language: { details.original_language}</p> : ""}
              {details.original_name ? <p>Original Name: {details.original_name}</p> : ""}
              {details.known_for_department ? <p>Known for: {details.known_for_department}</p> : ""}
              {details.release_date ? <p>Release Date: {details.release_date}</p> : ""}
            </div>
          </div>
        </div>
      </div>}
      </div>
    </Fragment>
  )
}
