import React, { useContext, useEffect } from "react";
import { PodcastContext } from "@context/PodcastContext";
import { useParams } from "react-router-dom";
import { fetchPodcastDetail } from "@actions/podcastActions";
import { usePodcastNavigation } from "@hooks";

export const PodcastEpisode = () => {
  const { podcastId, episodeId } = useParams();
  const { state, dispatch } = useContext(PodcastContext);
  const { back } = usePodcastNavigation();

  useEffect(() => {
    if (
      !state.selectedPodcast ||
      state.selectedPodcast.detail.collectionId !== podcastId
    ) {
      fetchPodcastDetail(dispatch, podcastId, state.podcasts);
    }
  }, [dispatch, podcastId, state.podcasts]);
  const {
    detail: { results },
    summary,
  } = state.selectedPodcast;
  const podcast = results[0];
  const episode = state.selectedPodcast?.detail?.results?.find(
    (ep) => ep.trackId === parseInt(episodeId)
  );

  if (state.loading) return <p>Loading episode details...</p>;
  if (state.error) return <p>Error: {state.error}</p>;
  if (!episode) return <p>Episode not found</p>;

  return (
    <div className="podcast-episode">
      <div className="podcast-detail__visual generic_card">
        <div className="podcast-detail__container-image">
          <img
            src={podcast.artworkUrl600}
            alt={`Cover of ${podcast.collectionName}`}
          />
        </div>
        <div className="podcast-detail__info">
          <h1 className="podcast-detail__info-title">
            {podcast.collectionName}
          </h1>
          <p className="podcast-detail__info-author">by {podcast.artistName}</p>
          <p className="podcast-detail__info-description">
            {" "}
            Description: {summary}
          </p>
        </div>
      </div>
      <div className="podcast-episode__visual generic_card">
        <div>
          <h3>
            {episode.trackName} <span onClick={back}>Back</span>
          </h3>
          <p>{episode.description}</p>
        </div>
        <div>
          <audio controls src={episode.previewUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};
