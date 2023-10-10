import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            Favrourite:[],

        }
    }
    async componentDidMount(){
        const res =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=78ae2834289e37eef7fe9ca749b4abec&language=en-US&page=${this.state.currPage}?`)
        let data= res.data
        this.setState({
            movies:[...data.results]
        })
        console.log(data)
        console.log('mounting done')
    }
    changeMovies=async()=>{
        console.log(this.state.currPage)
        const res =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=78ae2834289e37eef7fe9ca749b4abec&language=en-US&page=${this.state.currPage}`)
        let data= res.data
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight=()=>{
        let temparr=[]
        for (let i = 1; i <=  (this.state.parr.length+1); i++) {
            temparr.push(i);
        }
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies)
    }
    handleLeft=()=>{
        if(this.state.currPage != 1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
       
        
    }

    handleValue=(value)=>{
        if (value != this.state.currPage) {
            this.setState({
                currPage:value
            },this.changeMovies)
        }

    }
    handleFavrourite=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app')||"[]")
        if (this.state.Favrourite.includes(movie.id)) {
            oldData=oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem('movies-app',JSON.stringify(oldData))
        console.log(oldData);
        this.handleFavrouriteState();
    }   
    handleFavrouriteState=()=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app')||"[]")
        let temp= oldData.map((movie)=>movie.id);
        this.setState({
            Favrourite:[...temp]
        })
    }
  render() {
    // let movie=''
    // let movie= movies.results
    // console.log('remder')
    

    
    return (
      <>{
        this.state.movies.length==0 ? <div className="spinner-border text-success text-center" role="status">
             <span className="visually-hidden">Loading...</span>
             </div> : 
            <div>
                <h3 className="text-center">
                        <strong>
                            Trending
                        </strong> 
                </h3>
            <div className='movies-list'>
            {
            this.state.movies.map((movieobj)=>(
                <div className="card movie-card" onMouseEnter={()=>this.setState({hover:movieobj.id})} onMouseLeave={()=>this.setState({hover:""})} >
                    <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} className="card-img-top movie-img" alt={movieobj.title}  />
                    <h3 className="card-title movie-title">{movieobj.original_title}</h3>
                        {/* <p className="card-text movie-text">{movieobj.overview}</p> */}
                       <div className='button-wrapper' style={{display:'flex',justifyContent:'center',width:'100%'}}>
                         {
                            this.state.hover==movieobj.id &&
                         <a  className="btn btn-primary movie-button" onClick={()=>this.handleFavrourite(movieobj)}>{this.state.Favrourite.includes(movieobj.id)?"Remove from favourite":"Add to Favourite"}</a>
                        }
                        </div>
                </div>
            ))
        }
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
             <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                    {
                        this.state.parr.map((value)=>(

                            <li className="page-item"><a className="page-link" onClick={()=>this.handleValue(value)}>{value}</a></li>
                        ))
                    }
                            <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
            </nav>
        </div>
    </div>
      }
      </>
    )
  }
}
