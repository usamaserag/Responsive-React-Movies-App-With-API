import React, { useState, useEffect, useCallback } from "react";
import "./styles.scss";
import { useNavigate , useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import MovieCard from "../MovieCard";
import Button from "../Button";
import Input from "../Input";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      if (keyword === undefined) {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = { query: keyword };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    const params = { page: page + 1 };
    if (keyword === undefined) {
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        query: keyword,
        page: page + 1,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
    <div className="section mb-3">
      <MovieSearch category={props.category} keyword={keyword} />
    </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard key={index} item={item} category={props.category} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <Button className="btn-small" title="Load more" onClick={loadMore} />
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate  = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const movieSearch = useCallback(
    () => {
      if (keyword.trim().length > 0) {
        navigate(`search/${keyword}`);
      }
    },
    [keyword, navigate]
  );

  useEffect(()=> {
    const handleSearch = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        movieSearch()
      }
    }
    document.addEventListener('keyup', handleSearch);
    return () => {
      document.removeEventListener('keyup', handleSearch)
    }
  }, [keyword, movieSearch])
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter movie name"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className='btn-small-main' title='Search' onClick={movieSearch} />
    </div>
  );
};

export default MovieGrid;
