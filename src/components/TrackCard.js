import React from 'react'

const TrackCard = ({ trackResults }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <div className='container'>
      <p>{trackResults.track_position}. {trackResults.title_short}</p>
      <div className="card-content">
        <audio src={trackResults.preview} controls />
      </div>
    </div>
  </div>
)
export default TrackCard