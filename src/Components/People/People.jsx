import React, { Fragment, useEffect, useState } from 'react'

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

export default function People() {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  async function getPeople(page) {
    setLoading(true);
    const { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=f55aad1e521f26e2201c9c89a99d2050&language=en-US&page=${page}`);
    setLoading(false);
    setPeople(data.results);
    return data.results
  }
  useEffect(() => {
    getPeople(1);
  }, []);
  const handlePageClick = async (page) => {
    let currentPage = page.selected + 1;
    setLoading(true);
    const pages = await getPeople(currentPage);
    setLoading(false);
    setPeople(pages);
  }
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>People</title>
      </Helmet>
      <div className="container-fluid">
        {loading ? <div className='loader-container'>
          <div className="spinner"></div>
        </div>:  <>
        <div className="container-fluid">
        <div className="row">
          {people.map((p, index) => {
            return <div className="col-md-3" key={index}>
                <Link className='text-decoration-none text-white' to={`/about/${p.id}/person`}>
                <div className='position-relative'>
                  {p.profile_path ? <img src={`https://image.tmdb.org/t/p/w500${p.profile_path}`} alt='poster' className='w-100 poster'></img> : <img src={ "https://variety.com/wp-content/uploads/2013/10/film-placeholder.jpg"} width={350} height={530} alt='poster' />}
                <h3 className='h6'>{p.name}</h3>
                
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