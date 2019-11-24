import React from 'react'
import axios from 'axios'
import ResultCard from './ResultCard'
import Loading from './Loading'
import GetId from './GetId'

class SearchBar extends React.Component {

  constructor() {
    super()
    this.state = {
      results: null
    }
  }

  getData() {
    axios.get('https://cors-anywhere.herokuapp.com/api.deezer.com/search/artist/?q=' + this.props.match.params.userInput + '&index=0&limit=50&output=json')
      .then(res => {
        this.setState({ results: res.data.data })
      })
      .catch(err => console.log(err))

  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getData()
    }
  }

  render() {
    if (!this.state.results) return <Loading />
    console.log(this.state.results)
    return <div className="section has-background-black">
      <div className="container had-background-black">
        <div className="columns is-mobile is-multiline">
          {this.state.results.map((results, i) => {
            return <ResultCard key={<GetId /> + i} results={results} />
          })}
        </div>
      </div>
    </div>
  }
}
export default SearchBar


































// function filterArtists() {
//   const re = new RegExp(search, 'i')
//   return artists.map((results, i) => {
//     return <TrackCard key={i} tracks={tracks} />
//   })}



// input.addEventListener('keyup', (e) => {
//   search = e.target.value
//   displayCountries()
// })
// }



// class SearchBar extends React.Component {

//   constructor() {
//     super()
//     this.state = {
//       searchItem: ''

//     }
//   }


//   componentDidMount() {
//     axios.get(`https://api.deezer.com/search?q=${userInput}`)
//       .then(res => {

//         this.setState({ tracks: res.data.data })
//       })
//       .catch(err => console.log(err))
//   }


//   render() {

//     console.log(this.state.tracks)
//     return <div className="section">
//       <div className="container">
//         <div className="columns is-mobile is-multiline">
//           {this.state.tracks.map((tracks, i) => {
//             return <TrackCard key={i} tracks={tracks} />
//           })}
//         </div>
//       </div>
//     </div>
//   }
// }
// export default SearchBar