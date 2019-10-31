/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from './Header';

class aboutMovie extends Component {
    state = {
      movie: [],
    }

    componentDidMount() {
      const id = this.props.match.params.moviesId;

      axios.get(`https://cinema-api-test.herokuapp.com/movies?movie_id=${id}`)
        .then((res) => {
          this.setState({
            movie: res.data,
          });
          this.lol();
        });
    }

    lol = () => {
      const data = this.state.movie;

      for (let i = 0; i < data.genre_id.length; i += 1) {
        if (data.genre_id[i] === 0) {
          this.setState(Object.assign(data, { genre0: 'Action' }));
        } else if (data.genre_id[i] === 1) {
          this.setState(Object.assign(data, { genre1: 'Adventures' }));
        } else if (data.genre_id[i] === 2) {
          this.setState(Object.assign(data, { genre2: 'Comedy' }));
        } else if (data.genre_id[i] === 3) {
          this.setState(Object.assign(data, { genre3: 'Drama' }));
        } else if (data.genre_id[i] === 4) {
          this.setState(Object.assign(data, { genre4: 'Horror' }));
        } else {
          this.setState(Object.assign(data, { genre5: 'Westerns' }));
        }
      }
    }

    render() {
      const { movie } = this.state;

      return (
        <>
          <Header />
          <main>
            <div className="wrap-movie">
              <img className="movie-img" src={movie.pictureLink} alt="logo" />
              <div className="movie-about">
                <p className="cards-card_tittle movie-about">Жанр:</p>
                {movie.genre0
                  ? <p className="cards-card_tittle movie-about">{movie.genre0}</p> : ''}
                {movie.genre1
                  ? <p className="cards-card_tittle movie-about">{movie.genre1}</p> : ''}
                {movie.genre2
                  ? <p className="cards-card_tittle movie-about">{movie.genre2}</p> : ''}
                {movie.genre3
                  ? <p className="cards-card_tittle movie-about">{movie.genre3}</p> : ''}
                {movie.genre4
                  ? <p className="cards-card_tittle movie-about">{movie.genre4}</p> : ''}
                {movie.genre5
                  ? <p className="cards-card_tittle movie-about">{movie.genre5}</p> : ''}
              </div>
              <div className="movie-about cards-card_tittle">
                <p className="movie-about cards-card_tittle">Фильм:</p>
                <p className="movie-about cards-card_tittle">{movie.name}</p>
              </div>
              <div>
                <p className="cards-card_tittle">О фильме:</p>
                <p className="cards-card_tittle">{movie.description}</p>
              </div>
            </div>
          </main>
        </>
      );
    }
}

aboutMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      moviesId: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
export default aboutMovie;
