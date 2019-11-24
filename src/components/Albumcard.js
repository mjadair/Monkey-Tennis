import React from 'react'
import { Link } from 'react-router-dom'

const AlbumCard = ({ albumResults }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <div className="card-image">
      <figure className='image is-1by1 is-centered'>
        <Link to={`/${albumResults.id}/tracks`}>
          <img className='image-zoom' src={albumResults.cover_xl} alt={albumResults.title} />
        </Link>
      </figure>
    </div>
    <div className="card-content">
      <Link className="subtitle" to={`/${albumResults.id}/tracks`}>{albumResults.title}</Link>
    </div>
  </div>

)
export default AlbumCard

