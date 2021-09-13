import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function MovieCard(props) {

  const [movie, setMovie] = useState(props);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`) // Study this endpoint with Postman
      .then(response => {
        setMovie(response.data)
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  return (
    <div className="save-wrapper">
      <div className="movie-list">
        {props.movies.map(movie => (
          <Link key={movie.id} className='nav' to={`/movies/${movie.id}`}>
            <MovieDetails key={movie.id} movie={movie} />
          </Link>

        ))}
        <Route path='/movies/:id'>

          <h3>Actors</h3>

          {[movie.stars].map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
          <div className="save-button">Save</div>
        </Route>

      </div>

    </div>
  );
}

function MovieDetails(props) {
  const { title, director, metascore } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
    </div>



  );
}
