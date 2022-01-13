import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import MovieCard from "../MovieCard";
import Button from "../Button";

export const MovieGrid = (props) => {
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
