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
} from "@actions/podcastTypes";

const podcastReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PODCASTS_REQUEST:
    case FETCH_PODCAST_DETAIL_REQUEST:
    case FETCH_EPISODE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case FETCH_PODCASTS_SUCCESS:
      return {
        ...state,
        podcasts: action.payload,
        loading: false,
        loaded: true,
      };
    case FETCH_PODCAST_DETAIL_SUCCESS:
      return { ...state, selectedPodcast: action.payload, loading: false };
    case FETCH_EPISODE_DETAIL_SUCCESS:
      return {
        ...state,
        selectedEpisode: {
          detail: action.payload.detail,
          summary: action.payload.summary,
        },
        loading: false,
      };
    case FETCH_PODCASTS_FAILURE:
    case FETCH_PODCAST_DETAIL_FAILURE:
    case FETCH_EPISODE_DETAIL_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default podcastReducer;
