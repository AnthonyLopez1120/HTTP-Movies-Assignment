import React, { useState, useEffect } from "react"
import axios from "axios"

const initialState = {
    title: "",
    director: "",
    metascore: "",
    stars: ""
}
const UpdateMovie = props => {
    const [movie, setMovie] = useState({...initialState})

    useEffect(()=>{
        const movieToUpdate = props.movies.filter(movie =>{
            return movie.id === props.match.params.id
        })
        movieToUpdate && setMovie(movieToUpdate)
    }, [props.match.params.id])

const handleChange = e =>{
    if (e.target.name=== "stars"){
        const stars = e.target.value.split(",")
        setMovie({...movie, [e.target.name]: stars})
    }
}

const saveMovie = e =>{
    e.preventDefault()
    console.log(movie)
    axios
    .put(`http//:localhost:5000/api/movies/${movie.id}`, movie)
    .then(res => {
        console.log(res)
        props.setMovie(props.movies.map(item =>{
            if(item.id === movie.id ){
                return res.data
            }else{
                return item
            }
        }))
        props.history.push("/")
    })
    .catch(err => {
        console.log(err.message)
    })
    
    setMovie({...initialState})
}
    
    
    return(
       <div className="update-form">
           
           <h3>Update Movie</h3>
           
           <form onSubmit={saveMovie} className="uForm">
            
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" placeholder="title" value={movie.title} onChange={handleChange}/>

                <label htmlFor="metascore">Metascore</label>
                <input type="number" name="metascore" placeholder="score" value={movie.metascore} onChange={handleChange}/>

                <label htmlFor="director">Director:</label>
                <input type="text" name="director" placeholder="director" value={movie.director} onChange={handleChange}/>
            
                <label htmlFor="stars">Actors:</label>
                <input type="textfield" name="stars" placeholder="staring" value={movie.stars} onChange={handleChange}/>
            </div>
            <button type="submit">Save</button>

           </form>

       </div>
    )

}

export default UpdateMovie