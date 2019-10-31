/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Home extends Component {

  state = {
    sesmovies: [],
    allMov: [],
    curData: [],
  }

  componentDidMount() {
    const fetchData = () => {
      Promise.all([
        fetch('https://cinema-api-test.herokuapp.com/movies'),
        fetch('https://cinema-api-test.herokuapp.com/movieShows'),
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
          allMov: data1,
          sesmovies: data2,
        },
        () => this.filter()));
    };

    fetchData();
  }

  filter = () => {
    const sessionsMov = this.state.sesmovies;
    const allMovs = this.state.allMov;
    const data = [];

    for (let  i in sessionsMov) {
      for(let j in allMovs) {
        if( sessionsMov[i].movie_id == allMovs[j]._id ) {
          let time = sessionsMov[i].startTime.slice(11,-8)
          data.push(Object.assign(sessionsMov[i],allMovs[j],{truetime:time}))
        }
      }
    }

    return this.setState({ curData: data })
  };

  render() {
    const { curData } = this.state;

    return (
      <>
        <Header />
        <main>
          <div className="main-container">
            <div className="container-cards">
              {curData.map( sortmov => (
                <div key={sortmov._id} className="cards-card">
                  <Link
                    to={`/movies/${sortmov._id}`}
                  >
                  <img className="cards-card_img" src={sortmov.pictureLink} alt="logo" />
                  </Link>
                  <div className="cards-card_tittle">Название: {sortmov.name}</div>
                  <div className="cards-card_tittle">Цена: {sortmov.ticketPrice}</div>
                  <div className="cards-card_tittle">Время сеанса: {sortmov.truetime}</div>
                  <Link
                    to={`/buy/${sortmov._id}`}
                  >
                    <button className="btn btn-primary btn-sm" type="button">КУПИТЬ БИЛЕТ</button>
                  </Link>
                  <Link
                    to={`/movies/${sortmov._id}`}
                  >
                    <button className="btn btn-secondary btn-sm" type="button">О ФИЛЬМЕ</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Home;
