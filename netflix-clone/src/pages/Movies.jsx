import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { useNavigate } from "react-router-dom";
import { firebaseAuth,  } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Movies () {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const genres = useSelector((state) => state.netflix.genres);
    const movies = useSelector((state) => state.netflix.movies);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("in use effect");
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "movie" }));
        }
    },[genresLoaded]);


    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      //  if (currentUser) navigate("/");
    });


  return (
      <Container>
          <div className="navbar">
              <Navbar isScrolled={isScrolled} />
          </div>
          <div className="data">
              <SelectGenre genres={genres} type="movie"/>
              {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
          </div>
      </Container>
  );
  };


const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;




