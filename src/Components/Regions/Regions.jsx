import React, { Fragment } from 'react'

import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Regions() {
    const [regions, setRegions] = useState([])
    async function getRegions() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/watch/providers/regions?api_key=f55aad1e521f26e2201c9c89a99d2050&language=en-US`)
        setRegions(data.results)
    }
    useEffect(() => {
        getRegions()
    })
    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Regions</title>
            </Helmet>
            <div className="container-fluid">
                <div className="row">
                    {regions.map((region, i) => {
                        return <div className="col-md-4" key={i}>
                            <h1>{ region.english_name}</h1>
                        </div>
                    })}
                </div>
            </div>
        </Fragment>
  )
}
