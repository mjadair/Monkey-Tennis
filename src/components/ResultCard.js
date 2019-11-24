import React from 'react'
import { Link } from 'react-router-dom'

const ResultCard = ({ results }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <div className="card-image">
      <figure className='image is-1by1 is-centered'>
        <Link to={`/${results.id}/album`}>
          <img className='image-zoom' src={results.picture_xl} alt={results.name} />
        </Link>
      </figure>
    </div>
    <div className="card-content">
      <Link className="subtitle" to={`/${results.id}/album`}>{results.name}</Link>
    </div>
  </div>
)
export default ResultCard