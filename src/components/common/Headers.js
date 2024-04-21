import React from "react";
import { usePodcastNavigation } from "@hooks";

export const Headers = () => {
  const { toHome } = usePodcastNavigation();
  return (
    <div className="main-content__header">
      <p onClick={toHome}>Podcaster</p>
    </div>
  );
};
