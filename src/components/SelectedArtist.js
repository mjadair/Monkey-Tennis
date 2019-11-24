import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import AlbumCard from './Albumcard'
import Loading from './Loading'

class SelectedArtist extends React.Component {

  constructor() {
    super()
    this.state = {
      albumResults: [],
      err: false
    }
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${this.props.match.params.id}/albums`)
      .then(resp => this.setState({ albumResults: resp.data.data }))
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

    if (!this.state.albumResults) return <Loading />
    // console.log(this.state.albumResults)
    return <div className="section has-background-black">
      <div className="container has-background-black">
        <div className="columns is-mobile is-multiline">
          {this.state.albumResults.map((albumResults, i) => {
            return <AlbumCard key={i} albumResults={albumResults} />
          })}
        </div>
      </div>
    </div>
    
  }

}
export default SelectedArtist
