import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { Headers } from "./components/common";
import "./styles/main.scss";
import Routes from "./routes";

const App = () => {
  return (
    <PodcastProvider>
      <Router>
        <div className="main-content">
          <Headers />
          <Routes />
        </div>
      </Router>
    </PodcastProvider>
  );
};

export default App;
