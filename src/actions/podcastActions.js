import {
  FETCH_PODCASTS_REQUEST,
  FETCH_PODCASTS_SUCCESS,
  FETCH_PODCASTS_FAILURE,
  FETCH_PODCAST_DETAIL_REQUEST,
  FETCH_PODCAST_DETAIL_SUCCESS,
  FETCH_PODCAST_DETAIL_FAILURE,
  FETCH_EPISODE_DETAIL_REQUEST,
  FETCH_EPISODE_DETAIL_SUCCESS,
  FETCH_EPISODE_DETAIL_FAILURE,
} from "./podcastTypes";
import {
  fetchPodcasts as fetchPodcastsApi,
  fetchPodcastDetail as fetchPodcastDetailApi,
  fetchEpisodeDetail as fetchEpisodeDetailApi,
} from "@service/api";

export const fetchPodcasts = (dispatch) => {
  const lastFetchDate = localStorage.getItem("lastFetchDate");
  const now = new Date();

  if (
    lastFetchDate &&
    new Date(now - new Date(lastFetchDate)).getHours() < 24
  ) {
    const cachedPodcasts = JSON.parse(localStorage.getItem("cachedPodcasts"));
    dispatch({ type: FETCH_PODCASTS_SUCCESS, payload: cachedPodcasts });
  } else {
    dispatch({ type: FETCH_PODCASTS_REQUEST });
    fetchPodcastsApi()
      .then((response) => {
        const podcasts = response.data.feed.entry.map((entry) => ({
          id: entry.id.attributes["im:id"],
          name: entry["im:name"].label,
          image: entry["im:image"][entry["im:image"].length - 1].label,
          author: entry["im:artist"].label,
          summary: entry.summary.label,
        }));
        localStorage.setItem("cachedPodcasts", JSON.stringify(podcasts));
        localStorage.setItem("lastFetchDate", now.toISOString());
        dispatch({ type: FETCH_PODCASTS_SUCCESS, payload: podcasts });
      })
      .catch((error) => {
        dispatch({ type: FETCH_PODCASTS_FAILURE, payload: error });
      });
  }
};

export const fetchPodcastDetail = (dispatch, podcastId, podcasts) => {
  const podcast = podcasts.find((p) => p.id === podcastId);

  dispatch({ type: FETCH_PODCAST_DETAIL_REQUEST });
  fetchPodcastDetailApi(podcastId)
    .then((response) => {
      dispatch({
        type: FETCH_PODCAST_DETAIL_SUCCESS,
        payload: {
          detail: response.data,
          summary: podcast ? podcast.summary : "No summary available",
        },
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_PODCAST_DETAIL_FAILURE, payload: error });
    });
};

export const fetchEpisodeDetail = (dispatch, episodeId) => {
  dispatch({ type: FETCH_EPISODE_DETAIL_REQUEST });
  fetchEpisodeDetailApi(episodeId)
    .then((detail) =>
      dispatch({ type: FETCH_EPISODE_DETAIL_SUCCESS, payload: detail })
    )
    .catch((error) =>
      dispatch({ type: FETCH_EPISODE_DETAIL_FAILURE, payload: error })
    );
};
