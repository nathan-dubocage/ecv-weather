import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Forecasts from "./components/Forecasts/Forecasts";

import { Provider } from "react-redux";
import store from "./store/store";

import "./index.scss";
import Favorites from "./components/Favorites/Favorites";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/forecasts" element={<Forecasts />} />
				<Route path="/favorites" element={<Favorites />} />
			</Routes>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
