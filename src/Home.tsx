import React, { Component } from "react";

import Weather from "./components/Weather/Weather";
import Loader from "./views/Loader/Loader";
import Modal from "antd/lib/modal/Modal";
import { Input } from "antd";

import { WeatherState } from "./interfaces/WeatherState.interface";
import weatherRepository from "./repositories/weatherRepository";

import cities from "./assets/cities";
import { connect } from "react-redux";
import { setAlreadyFavorite, setCurrentForecasts, setCurrentWeather } from "./store/reducers/weatherReducer";
import { Link } from "react-router-dom";

class Home extends Component<any, WeatherState> {
	constructor(props: any) {
		super(props);
		this.state = {
			searchVisible: false,
			searchValue: "",
			isExistCity: true,
		};

		this.setValue = this.setValue.bind(this);
		this.sendSearch = this.sendSearch.bind(this);
		this.toggleSearch = this.toggleSearch.bind(this);
	}

	public componentDidMount(): void {
		if (!this.props?.currentWeather) {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					const weatherData = await weatherRepository.getWeather(latitude, longitude);
					const forecastsData = await weatherRepository.getForecasts(latitude, longitude);

					if (weatherData !== null && forecastsData !== null) {
						this.props.setCurrentWeather(weatherData);
						this.props.setCurrentForecasts(forecastsData);
					}
				});
			}
		}
	}

	public toggleSearch(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		this.setState({
			searchVisible: !this.state.searchVisible,
		});
	}

	public async sendSearch(searchValue: string): Promise<void> {
		const citiesUpperCase = cities.map((city) => city.toUpperCase());

		if (citiesUpperCase.includes(searchValue.toUpperCase())) {
			const weatherData = await weatherRepository.getWeather(null, null, searchValue);
			const latitude = weatherData?.coord?.lat;
			const longitude = weatherData?.coord?.lon;
			const forecastsData = weatherData !== null ? await weatherRepository.getForecasts(latitude, longitude) : null;

			if (weatherData !== null && forecastsData !== null) {
				this.props.setCurrentWeather(weatherData);
				this.props.setCurrentForecasts(forecastsData);

				this.setState({
					searchVisible: false,
					searchValue: "",
					isExistCity: true,
				});

				if (this.props.favorites.includes(weatherData.name)) this.props.setAlreadyFavorite(true);
				else this.props.setAlreadyFavorite(false);
			}
		} else {
			this.setState({
				isExistCity: false,
			});
		}
	}

	public setValue(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			searchValue: event.target.value,
		});
	}

	public render(): JSX.Element {
		const { Search } = Input;
		const temperature = this.props?.currentWeather?.main?.temp ?? null;

		let gradient: string = "bg-gradient-to-bl from-indigo-600 to-blue-900";

		if (temperature !== null) {
			if (temperature <= 5) gradient = "bg-gradient-to-bl from-cyan-600 to-cyan-900";
			else if (temperature > 5 && temperature <= 10) gradient = "bg-gradient-to-bl from-sky-400 to-blue-800";
			else if (temperature > 10 && temperature <= 15) gradient = "bg-gradient-to-bl from-indigo-600 to-blue-900";
			else if (temperature > 15) gradient = "bg-gradient-to-bl from-orange-400 to-rose-700";
		}

		return (
			<div className={`relative h-screen ${gradient} font-main`}>
				{this.props.currentWeather && this.props.currentForecasts ? (
					<>
						<img
							src="/assets/images/search.svg"
							alt="Rechercher la météo d'une ville"
							className="absolute right-10 top-10 w-6 h-6 cursor-pointer"
							onClick={(event) => this.toggleSearch(event)}
						/>

						<Modal
							title="Rechercher une ville"
							visible={this.state.searchVisible}
							footer={null}
							onCancel={this.toggleSearch}
						>
							<Search
								placeholder="Marseille"
								allowClear
								size="large"
								value={this.state.searchValue}
								onChange={this.setValue}
								onSearch={this.sendSearch}
							/>

							{!this.state.isExistCity ? (
								<div className="text-red-600 mt-2 ml-1">La ville recherchée ne semble pas exister</div>
							) : (
								<></>
							)}
						</Modal>

						<Link to="/favorites">
							<img
								src="/assets/images/favorite.svg"
								alt="Accéder aux favoris"
								className="absolute right-20 top-10 w-6 h-6 cursor-pointer"
							/>
						</Link>
						<Weather weatherData={this.props} />
					</>
				) : (
					<Loader />
				)}
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
		setAlreadyFavorite: (bool) => dispatch(setAlreadyFavorite(bool)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
