import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { useNavigate } from "react-router-dom";
import { firebaseAuth  } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function TVShows () {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const genres = useSelector((state) => state.netflix.genres);
    const movies = useSelector((state) => state.netflix.movies);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    const dispatch = useDispatch();

    useEffect(() => {
      if (!genres.length)
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "tv" }));
        }
    },[genresLoaded]);


    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const [user, setUser] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setUser(currentUser.uid);
      else navigate("/login");
    });


  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows avaialble for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}


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




