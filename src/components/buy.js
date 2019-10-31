import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

const Buy = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [session, setSession] = useState([]);
  const [params, setParams] = useState({});
  const [rowId, setRowId] = useState('');
  const [placePosition, setPlacePosition] = useState('');
  const [dataPOST, setdataPOST] = useState('');
  const [show, setShow] = useState(false);
  const { moviesId } = useParams();

  const fetchSessions = () => (
    /* eslint-disable-next-line */
    axios.get(`https://cinema-api-test.herokuapp.com/movieShows?movie_id=${moviesId}`)
  );

  const fetchMovie = () => (
    /* eslint-disable-next-line */
    axios.get(`https://cinema-api-test.herokuapp.com/movies?movie_id=${moviesId}`)
  );

  useEffect(() => {
    setShow(false);
    Promise.all([fetchSessions(), fetchMovie()])
      .then(([sessionData, MovieData]) => {
        setSession(sessionData.data);
        setMovie(MovieData.data);
        setLoading(false);
      });
  }, []);

  const buyTicket = (e, r) => {
    setParams({
      movieShow_id: moviesId,
      row_id: e,
      place_position: r,
      isFree: true,
    });

    fetch('https://cinema-api-test.herokuapp.com/bookingPlace', {
      method: 'POST',
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then(data => setdataPOST(data));

    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Header />
      <main>
        <div>
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Вы купили</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Title>
                  Ряд:
                  {rowId + 1}
                </Modal.Title>
                <Modal.Title>
                  Место:
                  {placePosition + 1}
                </Modal.Title>
                <Modal.Title>
                  Код билета:
                  {dataPOST}
                </Modal.Title>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Ok
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <div className="cards-card_tittle">
              Фильм:
              {movie.name}
            </div>
            <img className="movie-img" src={movie.pictureLink} alt="logo" />
          </div>
          {
            !loading && session.places.map((row, i) => (
              <div className="movie-row" key={Date.now() + Math.random()}>
                <p className="cards-card_tittle">Ряд</p>

                <div className="cards-card_tittle">
                  {i + 1}
                </div>
                {
                  row.map(place => (
                  /* eslint-disable-next-line */
                    <div className="movie-place" key={place._id}>
                      <div className="cards-card_tittle">
                        Meсто:
                        {place.position + 1}
                      </div>
                      <button
                        onClick={() => {
                          setRowId(i);
                          setPlacePosition(place.position);
                          buyTicket(i, place.position);
                        }}
                        type="button"
                        className="btn btn-info"
                        disabled={place.isFree}
                      >
                          Купить
                      </button>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </main>
    </>
  );
};

export default Buy;
