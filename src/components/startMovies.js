/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

class startMovies extends Component {
    state = {
      movies: [],
      selectValue: '',
      sortMov: [],
    }

    componentDidMount() {
      axios.get(`https://cinema-api-test.herokuapp.com/movies`)
        .then((res) => {
          this.setState({
            movies: res.data,
            sortMov: res.data,
          });
        });
    }

    handleInputChange = (event) => {
      const value  = event.target.value;

      this.filterByInput(value);
    }

    filterByInput = (value) => {
      if (value.length > 0) {
        this.setState(prevState => ({
          sortMov: prevState.movies.filter(e =>
            e.name.includes(value)),
        }));
      } else {
        this.setState(prevState => ({
          sortMov: prevState.movies,
        }));
      }
    }

    handleSelectChange = (event) => {
      let value =  event.target.value;

      this.filterBySelect(value);
    }

  filterBySelect = (value) => {
    if (value !== 'default') {
      this.setState(prevState => ({
        sortMov: prevState.movies.filter(
          e => e.genre_id.includes(Number(value))
        ),
      }));
    } else {
      this.setState(prevState => ({
        sortMov: prevState.movies,
      }));
    }
  }

  render() {
    const { sortMov } = this.state;

    return (
      <>
        <Header />
        <main>
          <div className="wrap-movies">
          <div className="main-search">
            <input
              className="form-control"
              placeholder="Search film"
              type="text"
              onChange={this.handleInputChange}
            />
            <select className="custom-select" onChange={this.handleSelectChange}>
              <option value="default">Choose genres</option>
              <option value="0">Action</option>
              <option value="1">Adventures</option>
              <option value="2">Comedy</option>
              <option value="3">Drama</option>
              <option value="4">Horror</option>
              <option value="5">Westerns</option>
            </select>
          </div>

          {sortMov.map(movie => (
            <div key={movie._id} className="movie-cards">
              <Link
                to={`/movies/${movie._id}`}
                className="cards-card_tittle"
              >
                {movie.name}
              </Link>
              <Link
                to={`/movies/${movie._id}`}
              >
              <img className="cards-card_img" src={movie.pictureLink} alt="logo" />
              </Link>
            </div>
          ))}
          </div>
        </main>
      </>
    );
  }
}

export default startMovies;
