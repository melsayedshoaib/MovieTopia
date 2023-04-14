import React, { Fragment, useEffect, useState } from 'react'

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

export default function Movies() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  async function getMovies(page) {
    setLoading(true);
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f55aad1e521f26e2201c9c89a99d2050&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
    setLoading(false);
    setMovies(data.results);
    return data.results
  }
  useEffect(() => {
    getMovies(1);
  }, []);
  const handlePageClick = async (page) => {
    let currentPage = page.selected + 1;
    setLoading(true);
    const pages = await getMovies(currentPage);
    setLoading(false);
    setMovies(pages);
  }
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movies</title>
      </Helmet>
      <div className="container-fluid">
        {loading ? <div className='loader-container'>
          <div className="spinner"></div>
        </div>:  <>
        <div className="container-fluid">
        <div className="row">
          {movies.map((m, index) => {
            return <div className="col-md-3" key={index}>
                <Link className='text-decoration-none text-white' to={`/about/${m.id}/movie`}>
                <div className='position-relative'>
                  {m.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt='poster' className='w-100 poster'></img> : <img src={ "https://variety.com/wp-content/uploads/2013/10/film-placeholder.jpg"} width={350} height={530} alt='poster' />}
                <h3 className='h6'>{m.title}</h3>
                <div className='vote top-0 end-0 position-absolute p-1'>{ m.vote_average.toFixed(1)}</div>
                </div>
                </Link>
                </div>
          })}
          </div>
        </div>
        </>}
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={ 'Next'}
          breakLabel={'...'}
          pageCount={100}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </Fragment>
  )
}