import { Component } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import cities from "../../assets/cities";
import weatherRepository from "../../repositories/weatherRepository";
import { setCurrentForecasts, setCurrentWeather } from "../../store/reducers/weatherReducer";
import "./Favorite.scss";

class Favorites extends Component<any, any> {
	public constructor(props) {
		super(props);
		this.updateCity = this.updateCity.bind(this);
	}

	public async updateCity(event): Promise<void> {
		const searchValue = event.target.textContent;
		const citiesUpperCase = cities.map((city) => city.toUpperCase());

		if (citiesUpperCase.includes(searchValue.toUpperCase())) {
			const weatherData = await weatherRepository.getWeather(null, null, searchValue);
			const latitude = weatherData?.coord?.lat;
			const longitude = weatherData?.coord?.lon;
			const forecastsData = weatherData !== null ? await weatherRepository.getForecasts(latitude, longitude) : null;

			if (weatherData !== null && forecastsData !== null) {
				this.props.setCurrentWeather(weatherData);
				this.props.setCurrentForecasts(forecastsData);
			}
		}
	}

	public render(): JSX.Element {
		return (
			<div className="relative h-screen bg-gradient-to-bl from-indigo-600 to-blue-900 font-main">
				<Link to="/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="absolute h-6 w-6 top-10 left-10"
						viewBox="0 0 24 24"
						stroke="#fff"
					>
						<path fill="#fff" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
				</Link>

				<div className="text-white text-4xl text-center font-semibold pt-10">Liste des favoris</div>

				{this.props.favorites.length === 0 ? (
					<div className="text-center text-white mt-10 text-lg">Aucune ville dans la liste des favoris</div>
				) : (
					<></>
				)}

				<div className="flex flex-wrap gap-y-4 w-4/5 text-white mt-10 mx-auto">
					{this.props.favorites.map((favorite) => {
						return (
							<Link
								to="/"
								key={favorite}
								className="favorite cursor-pointer bg-blue-300 bg-opacity-10 rounded-md font-bold py-3 px-4"
								onClick={this.updateCity}
							>
								{favorite}
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentWeather: state.weather.currentWeather,
		currentForecasts: state.weather.currentForecasts,
		favorites: state.weather.favorites,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentWeather: (weather) => dispatch(setCurrentWeather(weather)),
		setCurrentForecasts: (forecast) => dispatch(setCurrentForecasts(forecast)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
