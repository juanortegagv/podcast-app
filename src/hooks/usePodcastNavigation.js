import { useNavigate } from "react-router-dom";

export const usePodcastNavigation = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  const back = () => {
    navigate(-1);
  };

  const toPodcastDetail = (podcastId) => {
    console.log("podcastId: ", podcastId);
    navigate(`/podcast/${podcastId}`);
  };

  const toEpisodeDetail = (podcastId, episodeId) => {
    navigate(`/podcast/${podcastId}/episode/${episodeId}`);
  };

  return {
    toHome,
    toPodcastDetail,
    toEpisodeDetail,
    back,
  };
};
