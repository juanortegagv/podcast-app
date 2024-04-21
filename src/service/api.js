import axios from "axios";

const CORS_PROXY = "https://api.allorigins.win/raw?url=";

export const fetchPodcasts = async () => {
  try {
    const url = encodeURIComponent(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
    );
    return await axios.get(`${CORS_PROXY}${url}`);
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    throw error;
  }
};

export const fetchPodcastDetail = async (podcastId) => {
  try {
    const url = encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    );
    return await axios.get(`${CORS_PROXY}${url}`);
  } catch (error) {
    console.error("Error fetching podcast details:", error);
    throw error;
  }
};
