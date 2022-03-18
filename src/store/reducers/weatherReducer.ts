import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
	name: "weather",
	initialState: {
		currentWeather: null,
		currentForecasts: null,
		favorites: [],
		isAlreadyFavorite: false,
	},
	reducers: {
		setCurrentWeather: (state, action) => {
			state.currentWeather = {
				...action.payload,
			};
		},
		setCurrentForecasts: (state, action) => {
			state.currentForecasts = {
				...action.payload,
			};
		},
		addFavorite: (state, action) => {
			state.favorites.push(action.payload);
		},
		deleteFavorite: (state, action) => {
			state.favorites.splice(action.payload, 1);
		},
		setAlreadyFavorite: (state, action) => {
			state.isAlreadyFavorite = action.payload;
		},
	},
});

export const { setCurrentWeather, setCurrentForecasts, addFavorite, deleteFavorite, setAlreadyFavorite } =
	weatherSlice.actions;
export const selectItems = (state) => state;
export default weatherSlice.reducer;
