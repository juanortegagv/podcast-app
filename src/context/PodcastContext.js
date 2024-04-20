import React, { createContext, useReducer } from "react";
import podcastReducer from "./podcastReducer";

export const PodcastContext = createContext();

const initialState = {
  podcasts: [],
  loading: false,
  loaded: false,
  error: null,
};

export const PodcastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(podcastReducer, initialState);

  return (
    <PodcastContext.Provider value={{ state, dispatch }}>
      {children}
    </PodcastContext.Provider>
  );
};
