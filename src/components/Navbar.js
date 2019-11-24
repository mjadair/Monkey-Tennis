import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      userinput: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSearch(e) {
    this.setState({ userinput: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.history.push(`/search/${this.state.userinput}`)
  }

  render() {
    console.log(this.state.userinput)
    return (

      <div className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/Home">🎧 Nottify </Link>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-end">

              <div className="navbar-item">
                <Link className="navbar-item" to="/Charts">UK Top 40</Link>
              </div>

              <div className="navbar-item">
                <form className="control" onSubmit={this.handleSubmit}>
                  <input className="input" type="search" placeholder="Search Artists..."
                    onChange={this.handleSearch}
                    input="userinput" />
                </form>
              </div>
            </div>
          </div>




        </div>
      </div>
    )

  }

}

export default withRouter(Navbar)





























// import React from 'react'
// import { Link, withRouter } from 'react-router-dom'


// const Navbar = () => (

//   <div className="navbar">
//     <div className="container">
//       <div className="navbar-brand">
//         <Link className="navbar-item" to="/"> Music App</Link>
//       </div>
//       <div className="navbar-menu is-active">
//         <div className="navbar-end">

//           <div className="navbar-item">
//             <Link className="navbar-item" to="/Charts">Charts</Link>
//           </div>

//           <div className="navbar-item">
//             <Link className="navbar-item" to="/Search">Search</Link>
//           </div>


//           <div className="navbar-item">
//             <Link className="navbar-item" to="/Searchresults">Search Results</Link>
//           </div>


//           <div className="navbar-item">
//             <input className="input" type="text" placeholder="Search..." />
//           </div>
//         </div>
//       </div>


//     </div>
//   </div>
// )


// export default withRouter(Navbar)