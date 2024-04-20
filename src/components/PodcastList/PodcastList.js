import React, { useState, useContext, useEffect } from "react";
import { PodcastContext } from "@context/PodcastContext";
import { fetchPodcasts } from "@actions/podcastActions";
import { useNavigate } from "react-router-dom";

export const PodcastList = () => {
  const [filter, setFilter] = useState("");
  const { state, dispatch } = useContext(PodcastContext);
  console.log('state: ', state);

  const navigate = useNavigate();
  const navigateToPodcast = (podcast) => {
    dispatch({ type: "SET_SELECTED_PODCAST", payload: podcast });
    navigate(`/podcast/${podcast.id}`);
  };

  useEffect(() => {
    if (!state.loaded && !state.loading) {
      fetchPodcasts(dispatch);
    }
  }, [state.loaded, state.loading, dispatch]);

  const filteredPodcasts = state.podcasts.filter(
    (podcast) =>
      podcast.name.toLowerCase().includes(filter.toLowerCase()) ||
      podcast.author.toLowerCase().includes(filter.toLowerCase())
  );

  if (state.loading) return <p>Cargando...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  return (
    <div className="podcast-list">
      <div className="podcast-list__filter-container">
        <input
          type="text"
          className="podcast-list__filter-input"
          placeholder="Filtrar podcasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="podcast-list__grid">
        {filteredPodcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="podcast-list__card"
            onClick={() => navigateToPodcast(podcast)}
          >
            <img
              src={podcast.image}
              alt={podcast.name}
              className="podcast-list__card__image"
            />
            <div className="podcast-list__card__content generic_card">
              <h3 className="podcast-list__card__title">{podcast.name}</h3>
              <p className="podcast-list__card__author">
                Autor: {podcast.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
