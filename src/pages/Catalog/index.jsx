import React from "react";
import { useParams } from "react-router-dom";
import { category as cate } from '../../api/tmdbApi';
import { MovieGrid } from "../../components/MovieGrid";
import { PageHeader } from "../../components/PageHeader";


const Catalog = () => {
  const { category } = useParams()
  console.log(category)
  return (
    <div>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
