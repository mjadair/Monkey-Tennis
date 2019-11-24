import React from 'react'
import axios from 'axios'
import ChartCard from './ChartCard'
import Loading from './Loading'

class Tracks extends React.Component {

  constructor() {
    super()
    this.state = {
      chartTracks: null

    }
  }
  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/api.deezer.com/playlist/2868476282/tracks&limit=40"')
      .then(res => {
        
        this.setState({ chartTracks: res.data.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.chartTracks) return <Loading />
    console.log(this.state.chartTracks)
    return <div className="section has-background-black">
      <div className="container has-background-black">
        <div className="tile is-ancestor is-vertical">
          {this.state.chartTracks.map((chartTracks, i) => {
            return <ChartCard key={i} chartTracks={chartTracks} />
          })}
        </div>
      </div>
    </div>
  }
}
export default Tracks