import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Button";
import apiConfig from "../../api/apiConfig";
import { category } from "../../api/tmdbApi";
import "./styles.scss";

const MovieCard = (props) => {
  const link = `/${category[props.category]}/${props.item.id}`;

  const background = apiConfig.w500Image(
    props.item.poster_path || props.item.backdrop_path
  );

  return (
    <Link to={link}>
      <div className="movie-card" style={{backgroundImage: `url(${background})`}}>
        <Button title={<i className="fas fa-play"></i>} />
      </div>
      <h3>{ props.item.title || props.item.name }</h3>
    </Link>
  );
};

MovieCard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default MovieCard;
