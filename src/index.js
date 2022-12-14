import React from "react";
import ReactDOM from "react-dom/client";
import { MainRouter } from "./MainRouter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Data } from "./Components/Context/DataContext";
import "./index.css"
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Data>
      <MainRouter />
    </Data>
  </React.StrictMode>
);
