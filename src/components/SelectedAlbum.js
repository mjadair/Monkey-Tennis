import React from 'react'
import axios from 'axios'
import TrackCard from './TrackCard'
import Loading from './Loading'

class SelectedAlbum extends React.Component {

  constructor() {
    super()
    this.state = {
      trackResults: [],
      err: false
    }
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/album/${this.props.match.params.id}/tracks`)
      .then(resp => this.setState({ trackResults: resp.data.data }))
      .catch(err => this.setState({ err: err.response.status }))
  }

  render() {
    if (this.state.err === 404) {
      return <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered">Oops!</h1>
            <h2 className="subtitle has-text-centered is-italic">Looks like this page has had a little too much and cannot be found...</h2>
          </div>
        </div>
      </section>
    }

    if (!this.state.trackResults) return <Loading />
    console.log(this.state.trackResults)
    return <div className="section has-background-black">
      <div className="container has-background-black">
        <div className="columns is-mobile is-multiline">
          {this.state.trackResults.map((trackResults, i) => {
            return <TrackCard key={i} trackResults={trackResults} />
          })}
        </div>
      </div>
    </div>
    
  }

}

export default SelectedAlbum
