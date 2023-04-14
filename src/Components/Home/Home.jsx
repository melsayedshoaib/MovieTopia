import React, { Fragment, useEffect, useState } from 'react'

import DisplayItems from '../DisplayItems/DisplayItems';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);
  async function getTrending(media_item, callback) {
    setLoading(true);
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${media_item}/day?api_key=f55aad1e521f26e2201c9c89a99d2050`);
    setLoading(false);
    callback(data.results);
  }
  useEffect(() => {
    getTrending('movie', setMovies);
    getTrending('tv', setTv);
    getTrending('person', setPeople);
  }, []);
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WatchTopia - Home</title>
      </Helmet>
      {loading ?  <div className='loader-container'>
          <div className="spinner"></div>
        </div>:  <>
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="border w-25 mb-3"></div>
              <h2>Trending Movies <br /> to Watch Right Now</h2>
              <p className='text-muted'>Most Watched Movies by days</p>
              <div className="border w-75 mt-3"></div>
            </div>
          </div>
          {movies.slice(0,10).map((movie, index) => <DisplayItems key={ index} item={movie} />)}
        </div>
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="border w-25 mb-3"></div>
              <h2>Trending Tv <br /> to Watch Right Now</h2>
              <p className='text-muted'>Most Watched Tv by days</p>
              <div className="border w-75 mt-3"></div>
            </div>
          </div>
          {tv.slice(0,10).map((tv, index) => <DisplayItems key={ index} item={tv} />)}
        </div>
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div>
              <div className="border w-25 mb-3"></div>
              <h2>Trending People <br /> to Watch Right Now</h2>
              <p className='text-muted'>Most Watched People by days</p>
              <div className="border w-75 mt-3"></div>
            </div>
          </div>
          {people.slice(0,10).map((people, index) => <DisplayItems key={ index} item={people} />)}
        </div>
        </div>
        </>}
    </Fragment>
  )
}
