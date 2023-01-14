import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";

import './styles.scss'

const VideoList = ({id}) => {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, id);
      setVideos(res.results.slice(0, 5));
    };
    getVideos();
  }, [category, id]);
  return (
    <div>
        {videos.map((video, index) => (
            <Video key={index} video={video} />
        ))}
    </div>
  )
};

const Video = (props) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
        iframeRef.current.setAttribute('height', height);
      }, []);

    return (
        <div className="video">
            <h2 className="title">{props.video.name}</h2>
            <iframe
              src={`https://www.youtube.com/embed/${props.video.key}`}
              ref={iframeRef}
              width="100%"
              title="video"
            ></iframe>

        </div>
    )
}
export default VideoList;
