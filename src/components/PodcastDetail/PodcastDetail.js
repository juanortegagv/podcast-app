import React, { useContext, useEffect } from "react";
import { PodcastContext } from "@context/PodcastContext";
import { fetchPodcastDetail } from "@actions/podcastActions";
import { useParams } from "react-router-dom";
import { usePodcastNavigation } from "@hooks";

export const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { state, dispatch } = useContext(PodcastContext);
  const { toEpisodeDetail } = usePodcastNavigation();

  useEffect(() => {
    if (
      !state.selectedPodcast ||
      state.selectedPodcast.detail.collectionId !== podcastId
    ) {
      fetchPodcastDetail(dispatch, podcastId, state.podcasts);
    }
  }, [dispatch, podcastId, state.podcasts]);

  if (state.loading) return <p>Loading podcast details...</p>;
  if (state.error) return <p>No details: {state.error}</p>;

  const {
    detail: { results },
    summary,
  } = state.selectedPodcast;
  const podcast = results[0];

  return (
    <div className="podcast-detail">
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
      <div className="podcast-detail__episodes">
        <h2 className="podcast-detail__episodes-count generic_card">
          Episodes: {podcast.trackCount}
        </h2>
        <table className="podcast-detail__episodes-table generic_card">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {results.map((episode, index) => (
              <tr
                key={index}
                className="podcast-detail__episodes-row"
                onClick={() => toEpisodeDetail(podcastId, episode.trackId)}
              >
                <td className="podcast-detail__episodes-title">
                  {episode.trackName}
                </td>
                <td className="podcast-detail__episodes-date">
                  {new Date(episode.releaseDate).toLocaleDateString()}
                </td>
                <td className="podcast-detail__episodes-duration">
                  {episode.trackTimeMillis
                    ? `${(episode.trackTimeMillis / 60000).toFixed(2)} min`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
