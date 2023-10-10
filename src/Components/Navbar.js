import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'0.5'}}>
        <Link to="/" style={{textDocoration:'none'}}><h1 style={{marginLeft:'1rem',marginTop:'1rem'}}>Movies App</h1></Link>
        <Link to="/favourites" style={{textDocoration:'none'}}><h2 style={{marginLeft:'2rem',marginTop:'1.5rem'}}>Favourites</h2></Link>
      </div>
    )
  }
}
