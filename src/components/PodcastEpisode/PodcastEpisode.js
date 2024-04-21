import React, { useContext, useEffect } from "react";
import { PodcastContext } from "@context/PodcastContext";
import { useParams } from "react-router-dom";
import { fetchPodcastDetail } from "@actions/podcastActions";
import { usePodcastNavigation } from "@hooks";
import { PodcastVisual } from "@components/common";

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

  if (!episode) return <p>Episode not found</p>;

  return (
    <div className="podcast-episode">
      <PodcastVisual
        artworkUrl={podcast.artworkUrl600}
        collectionName={podcast.collectionName}
        artistName={podcast.artistName}
        description={summary}
      />
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
