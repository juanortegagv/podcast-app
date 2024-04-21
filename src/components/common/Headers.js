import React, { useContext } from "react";
import { usePodcastNavigation } from "@hooks";
import { PodcastContext } from "@context/PodcastContext";

export const Headers = () => {
  const { toHome } = usePodcastNavigation();
  const { state } = useContext(PodcastContext);
  return (
    <div className="main-content__header">
      <p onClick={toHome}>Podcaster</p>
      {state.loading && <div className="loading-indicator"></div>}
    </div>
  );
};
