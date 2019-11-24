import React from 'react'

const ChartCard = ({ chartTracks }) => (<>
  <div className="tile is-parent is-14 box has-background-black">
    <article className="tile is-child is-vertical">
      <p className="subtitle">{chartTracks.title}</p>
      <img className="image is-4by3 is-centered is-marginless is-paddingless" src={chartTracks.album.cover_big} alt="" />
    </article>
    <audio className="audioplayback" src={chartTracks.preview} controls />
  </div>

</>

)
export default ChartCard

