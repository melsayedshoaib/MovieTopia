import React, { Fragment } from 'react'

import { Helmet } from 'react-helmet'
import image from '../../assets/imgs/notfound.jpg'

export default function Notfound() {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 - Page Not Found</title>
      </Helmet>
      <img className='w-100 vh-100' src={image} alt='not found'></img>
    </Fragment>
  )
}
