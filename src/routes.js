import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import {
  PodcastList,
  PodcastDetail,
  PodcastEpisode,
} from "@components";

const RoutesComponent = () => {
  const { id } = useParams();
  return (
    <Routes>
      <Route path="/" element={<PodcastList />} />
      <Route
        path="/podcast/:podcastId"
        element={<PodcastDetail podcastId={id} />}
      />
      <Route
        path="/podcast/:podcastId/episode/:episodeId"
        element={<PodcastEpisode />}
      />
    </Routes>
  );
};

export default RoutesComponent;
