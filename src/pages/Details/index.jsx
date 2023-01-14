<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './styles.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/MovieList';

const Details = () => {
    const {category, id} = useParams();
    const [item, setItem] = useState(null);
    useEffect(() => {
        const getDetails = async () => {
            const response = await tmdbApi.detail(category, id, {params: {}});
            console.log("Film===>", response)
            setItem(response)
            window.scrollTo(0,0)
        }
        getDetails()
    },[category, id])
    return (
        <>
            {
                item && (
                   <>
                    <div className='banner' style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                    <div className='mb-3 movie-content container'>
                        <div className="movie-content__poster">
                            <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        </div>
                        <div className="movie-content__info">
                            <h1 className='title'>{item.title || item.name}</h1>
                            <div className='genres'>
                                {
                                    item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className="genres__item">{genre.name}</span>
                                    ))
                                }
                            </div>
                            <p className='overview'>{item.overview}</p>
                            <div className='cast'>
                                <div className='section__header'>
                                    <h2>Casts</h2>
                                </div>
                                <CastList id={item.id} />
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                            <div className='section mb-3'>
                                <VideoList id={item.id} />
                            </div>
                            <div className='section mb-3'>
                                <h2>Similar</h2>
                                <MovieList category={category} type="similar" id={item.id} />
                            </div>
                    </div>
                   </>
                )
            }
        </>
    )
}
=======
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./styles.scss";
import VideoList from "../../components/VideoList";
import MovieList from "../../components/MovieList"

const Details = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };

    const getCasts = async () => {
      const res = await tmdbApi.credits(category, id);
      setCasts(res.cast.slice(0, 5));
    };

    getDetails();
    getCasts();
  }, [category, id]);

  return (
    <div>
      {item && (
        <>
          <div
            className="selected-item"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="selected-item__content mb-3 container">
            <div className="selected-item__content__poster">
              <div
                className="selected-item__content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="selected-item__content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="descriptions">
                {item.genres.map((genre, index) => (
                  <span key={index} className="descriptions__item">
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="casts">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <div className="casts-container">
                  {casts.map((cast, index) => (
                    <div key={index} className="casts__item">
                      <div
                        className="casts__item__img"
                        style={{
                          backgroundImage: `url(${apiConfig.w500Image(
                            cast.profile_path
                          )})`,
                        }}
                      ></div>
                      <p className="casts__item__name">{cast.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="container">
        <div className="section mb-3">
            <VideoList id={id} />
        </div>
        <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>Similar</h2>
            </div>
            <MovieList category={category} type="similar" id={id} />
        </div>
      </div>
    </div>
  );
};
>>>>>>> 92b54db (update)

export default Details;
