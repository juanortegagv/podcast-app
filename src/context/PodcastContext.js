import React, { createContext, useEffect, useReducer } from "react";
import podcastReducer from "./podcastReducer";

export const PodcastContext = createContext();

const initialState = {
  podcasts: [],
  loading: false,
  loaded: false,
  error: null,
};

export const PodcastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    podcastReducer,
    initialState,
    (initial) => {
      const storedState = localStorage.getItem("podcastState");
      return storedState ? JSON.parse(storedState) : initial;
    }
  );

  useEffect(() => {
    localStorage.setItem("podcastState", JSON.stringify(state));
  }, [state]);

  return (
    <PodcastContext.Provider value={{ state, dispatch }}>
      {children}
    </PodcastContext.Provider>
  );
};
