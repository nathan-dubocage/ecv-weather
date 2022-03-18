import { notification } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import { addFavorite, deleteFavorite, setAlreadyFavorite } from "../../store/reducers/weatherReducer";

class Main extends Component<any, any> {
	public constructor(props) {
		super(props);
		this.toggleFavorite = this.toggleFavorite.bind(this);
	}

	public toggleFavorite(): void {
		const { weatherData } = this.props;

		if (this.props.favorites.length === 0) {
			this.props.addFavorite(weatherData.currentWeather.name);
			this.props.setAlreadyFavorite(true);
			notification.open({
				message: "Succès",
				description: `${weatherData.currentWeather.name} a été ajoutée à la liste des favoris.`,
			});
		} else if (this.props.favorites.includes(weatherData.currentWeather.name)) {
			this.props.deleteFavorite(this.props.favorites.indexOf(weatherData.currentWeather.name));
			this.props.setAlreadyFavorite(false);
		} else {
			this.props.addFavorite(weatherData.currentWeather.name);
			this.props.setAlreadyFavorite(!this.props.alreadyFavorite);
			notification.open({
				message: "Succès",
				description: `${weatherData.currentWeather.name} a été ajoutée à la liste des favoris.`,
			});
		}
	}

	public render(): JSX.Element {
		const { currentWeather } = this.props.weatherData;

		const currentDateString = new Date().toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});

		return (
			<>
				<div className="text-4xl font-semibold pt-10">{currentWeather.name}</div>
				<div className="text-white text-opacity-50 text-xl font-light mt-3">{currentDateString}</div>
				<img
					src={`/assets/images/${currentWeather.weather[0].icon}.png`}
					alt={currentWeather.weather[0].description}
					className="w-40 mx-auto mt-10 animate-slide"
				/>

				<div className="flex justify-center gap-x-4 mt-16">
					<div className="flex flex-col bg-blue-300 bg-opacity-5 rounded-md py-2 px-6">
						<span className="font-thin">Température</span>
						<span className="font-semibold text-lg mt-2">{Math.floor(currentWeather.main.temp)}°C</span>
					</div>

					<div className="flex flex-col bg-blue-300 bg-opacity-5 rounded-md py-2 px-6">
						<span className="font-thin">Vent</span>
						<span className="font-semibold text-lg mt-2">{Math.floor(currentWeather.wind.speed * 3.6)}km/h</span>
					</div>

					<div className="flex flex-col bg-blue-300 bg-opacity-5 rounded-md py-2 px-6">
						<span className="font-thin">Météo</span>
						<span className="font-semibold text-lg mt-2">
							{currentWeather.weather[0].description.charAt(0).toUpperCase() +
								currentWeather.weather[0].description.slice(1)}
						</span>
					</div>

					<div className="flex flex-col bg-blue-300 bg-opacity-5 rounded-md py-2 px-6">
						<span className="font-thin">Favoris</span>
						<div className="mt-2">
							<img
								onClick={this.toggleFavorite}
								className="cursor-pointer w-5 mx-auto mt-1"
								src={`/assets/images/favorite-${this.props.isAlreadyFavorite ? "full" : "empty"}.svg`}
								alt="Ajouter aux favoris"
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		favorites: state.weather.favorites,
		isAlreadyFavorite: state.weather.isAlreadyFavorite,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addFavorite: (favorite) => dispatch(addFavorite(favorite)),
		deleteFavorite: (favorite) => dispatch(deleteFavorite(favorite)),
		setAlreadyFavorite: (bool) => dispatch(setAlreadyFavorite(bool)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
