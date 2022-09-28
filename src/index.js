import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinList from "./CoinList";
import CoinDetail from "./CoinDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
        <React.StrictMode>
                <BrowserRouter>
                        <Routes>
                                <Route path="/" element={<CoinList />} />
                                <Route
                                        path="/:coinName"
                                        element={<CoinDetail />}
                                />
                        </Routes>
                </BrowserRouter>
        </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
