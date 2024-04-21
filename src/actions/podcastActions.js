import {
  FETCH_PODCASTS_REQUEST,
  FETCH_PODCASTS_SUCCESS,
  FETCH_PODCASTS_FAILURE,
  FETCH_PODCAST_DETAIL_REQUEST,
  FETCH_PODCAST_DETAIL_SUCCESS,
  FETCH_PODCAST_DETAIL_FAILURE,
} from "./podcastTypes";
import {
  fetchPodcasts as fetchPodcastsApi,
  fetchPodcastDetail as fetchPodcastDetailApi,
} from "@service/api";

const fetchFromStorage = (storageKey, dateKey) => {
  const lastFetchDate = localStorage.getItem(dateKey);
  const now = new Date();

  if (
    lastFetchDate &&
    new Date(now - new Date(lastFetchDate)).getHours() < 24
  ) {
    const cachedData = localStorage.getItem(storageKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }
  return null;
};

export const fetchPodcasts = (dispatch) => {
  const cachedPodcasts = fetchFromStorage("cachedPodcasts", "lastFetchDate");
  if (cachedPodcasts) {
    dispatch({ type: FETCH_PODCASTS_SUCCESS, payload: cachedPodcasts });
    return;
  }

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
      localStorage.setItem("lastFetchDate", new Date().toISOString());
      dispatch({ type: FETCH_PODCASTS_SUCCESS, payload: podcasts });
    })
    .catch((error) => {
      dispatch({ type: FETCH_PODCASTS_FAILURE, payload: error });
    });
};

export const fetchPodcastDetail = (dispatch, podcastId, podcasts) => {
  const storedPodcastDetails = fetchFromStorage(
    `podcastDetail-${podcastId}`,
    `lastFetchDetailDate-${podcastId}`
  );
  if (storedPodcastDetails) {
    dispatch({
      type: FETCH_PODCAST_DETAIL_SUCCESS,
      payload: storedPodcastDetails,
    });
    return;
  }

  dispatch({ type: FETCH_PODCAST_DETAIL_REQUEST });
  fetchPodcastDetailApi(podcastId)
    .then((response) => {
      const podcast = podcasts.find((p) => p.id === podcastId) || {};
      const detailPayload = {
        detail: response.data,
        summary: podcast.summary || "No summary available",
      };
      dispatch({ type: FETCH_PODCAST_DETAIL_SUCCESS, payload: detailPayload });
      localStorage.setItem(
        `podcastDetail-${podcastId}`,
        JSON.stringify(detailPayload)
      );
      localStorage.setItem(
        `lastFetchDetailDate-${podcastId}`,
        new Date().toISOString()
      );
    })
    .catch((error) => {
      dispatch({ type: FETCH_PODCAST_DETAIL_FAILURE, payload: error });
    });
};
