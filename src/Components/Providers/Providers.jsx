import React, { Fragment } from 'react'

import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Providers() {
    const [loading, setLoading] = useState(false);
    const [movieProvider, setMovieProvider] = useState([])
    const [tvProvider, setTvProvider] = useState([])
    async function getProvider(provider, callback) {
        setLoading(true);
        const { data } = await axios.get(`https://api.themoviedb.org/3/watch/providers/${provider}?api_key=f55aad1e521f26e2201c9c89a99d2050&language=en-US`)
        setLoading(false);
        callback(data.results)
    }
    useEffect(() => {
        getProvider('movie', setMovieProvider)
        getProvider('tv', setTvProvider)
    }, [])
    return (
        <Fragment>
            <Helmet>
                <meta charSet='utf-8'/>
                <title>Providers</title>
            </Helmet>
            <div className="container-fluid">
                {loading ? <div className='loader-container'>
          <div className="spinner"></div>
        </div>: <>
                     <>
                <h2>Movie Providers</h2>
                <div className="container-fluid">
                    <div className="row">
                        {movieProvider.map((movie, index) => {
                            return <div className="col-md-4" key={index}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.logo_path}`} alt='movie' className='w-100' />
                                <p>{ movie.provider_name}</p>
                            </div>
                        })}
                    </div>
                </div>
            </>
            <>
                <h2>TV Providers</h2>
                <div className="container-fluid">
                    <div className="row">
                        {tvProvider.map((tv, index) => {
                            return <div className="col-md-4" key={index}>
                                <img src={`https://image.tmdb.org/t/p/w500${tv.logo_path}`} alt='movie' className='w-100' />
                                <p>{ tv.provider_name}</p>
                            </div>
                        })}
                    </div>
                </div>
            </>
                </>}
            </div>
      </Fragment>
  )
}
