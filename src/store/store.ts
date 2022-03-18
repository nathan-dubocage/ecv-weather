import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weatherReducer";

export default configureStore({
	reducer: {
		weather: weatherReducer,
	},
});
