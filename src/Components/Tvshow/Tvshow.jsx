import React, { Fragment, useEffect, useState } from 'react'

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

export default function Tvshow() {
  const [loading, setLoading] = useState(false);
  const [tv, setTv] = useState([]);
  async function getTv(page) {
    setLoading(true);
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=f55aad1e521f26e2201c9c89a99d2050&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
    setLoading(false);
    setTv(data.results);
    return data.results
  }
  useEffect(() => {
    getTv(1);
  }, []);
  const handlePageClick = async (page) => {
    let currentPage = page.selected + 1;
    setLoading(true);
    const pages = await getTv(currentPage);
    setLoading(false);
    setTv(pages);
  }
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TV Show</title>
      </Helmet>
      <div className="container-fluid">
        {loading ? <div className='loader-container'>
          <div className="spinner"></div>
        </div>:  <>
        <div className="container-fluid">
        <div className="row">
          {tv.map((t, index) => {
            return <div className="col-md-3" key={index}>
                <Link className='text-decoration-none text-white' to={`/about/${t.id}/tv`}>
                <div className='position-relative'>
                  {t.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${t.poster_path}`} alt='poster' className='w-100 poster'></img> : <img src={ "https://variety.com/wp-content/uploads/2013/10/film-placeholder.jpg"} width={350} height={530} alt='poster' />}
                <h3 className='h6'>{t.title}</h3>
                <div className='vote top-0 end-0 position-absolute p-1'>{ t.vote_average.toFixed(1)}</div>
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
