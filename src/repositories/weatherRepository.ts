import axios from "axios";

import { ForecastInterface, WeatherInterface } from "../interfaces/WeatherState.interface";

const API_KEY = process.env.REACT_APP_API_KEY ?? null;

const weatherRepository = {
	async getWeather(latitude?: number, longitude?: number, cityName: string = null): Promise<WeatherInterface | null> {
		let apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=FR&appid=${API_KEY}`;

		if (cityName !== null)
			apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=FR&appid=${API_KEY}`;

		try {
			const currentWeather = await axios.get(apiUrl);
			return currentWeather.data;
		} catch (error) {
			return null;
		}
	},

	async getForecasts(latitude?: number, longitude?: number): Promise<ForecastInterface | null> {
		try {
			const forecastsWeather = await axios.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=FR&appid=${API_KEY}`
			);
			return forecastsWeather.data;
		} catch (error) {
			return null;
		}
	},
};

export default weatherRepository;
