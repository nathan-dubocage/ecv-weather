import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentForecasts, setCurrentWeather } from "../../store/reducers/weatherReducer";
import "./Forecasts.scss";

class Forecasts extends Component<any> {
	public constructor(props: any) {
		super(props);
		this.checkStore();
	}

	public checkStore(): void {
		if (this.props.currentWeather === null && this.props.currentForecasts === null) window.location.href = "../";
	}

	public render(): JSX.Element {
		const temperature = this.props?.currentWeather?.main?.temp ?? null;
		const { currentWeather, currentForecasts } = this.props;

		let gradient: string = "bg-gradient-to-bl from-indigo-600 to-blue-900";

		if (temperature !== null) {
			if (temperature <= 5) gradient = "bg-gradient-to-bl from-cyan-600 to-cyan-900";
			else if (temperature > 5 && temperature <= 10) gradient = "bg-gradient-to-bl from-sky-400 to-blue-800";
			else if (temperature > 10 && temperature <= 15) gradient = "bg-gradient-to-bl from-indigo-600 to-blue-900";
			else if (temperature > 15) gradient = "bg-gradient-to-bl from-orange-400 to-rose-700";
		}

		return (
			<div className={`relative h-screen ${gradient} text-white font-main`}>
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

				<div className="text-4xl text-center font-semibold pt-10">{currentWeather.name}</div>

				<div className="flex flex-wrap justify-between gap-y-4 w-4/5 mt-10 mx-auto">
					{currentForecasts.daily.map((forecast, index) => {
						const currentDate = new Date(forecast.dt * 1000);
						const currentDay = currentDate.toLocaleDateString("fr-FR", {
							weekday: "long",
							day: "2-digit",
							month: "long",
						});
						const now = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

						return (
							<div key={index} className="forecast flex-grow bg-blue-300 bg-opacity-10 rounded-md py-3 px-4">
								<div className="flex justify-between items-center">
									<div className="flex-1">
										<img
											src={`/assets/images/${forecast.weather[0].icon}.png`}
											alt={forecast.weather[0].description}
											className="w-12 h-12"
										/>
									</div>
									<div className="flex flex-col items-end gap-y-1">
										<div className="text-base">{now}</div>
										<div>
											<span className="font-bold">{Math.floor(forecast.temp.day)}°C</span>
										</div>
										<div className="text-base">
											<span className="font-bold">
												{forecast.weather[0].description.charAt(0).toUpperCase() +
													forecast.weather[0].description.slice(1)}
											</span>
										</div>
									</div>
								</div>
							</div>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentWeather: (weather) => dispatch(setCurrentWeather(weather)),
		setCurrentForecasts: (forecast) => dispatch(setCurrentForecasts(forecast)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Forecasts);
