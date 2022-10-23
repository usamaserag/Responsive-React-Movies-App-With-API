import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";

const VideoList = (props) => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, props.id);
      setVideos(response.results.slice(0, 5));
    };
    getVideos();
  }, [category, props.id]);

//   const iframeRef = useRef(null);

//   useEffect(() => {
//     console.log("iframeRef", iframeRef);
//     const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
//     console.log("height", height);
//     iframeRef.current.setAttribute("height", height);
//   }, []);

  return (
    <>
      {videos.map((video, i) => (
        <div className="video" key={i}>
          <h2 className="video__title">{video.name}</h2>
          <iframe
            src={`https://www.youtube.com/embed/${video.key}`}
            height="600px"
            width="100%"
            title="video"
          ></iframe>
        </div>
      ))}
    </>
  );
};

export default VideoList;
