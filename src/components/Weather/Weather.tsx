import { Component } from "react";
import { Link } from "react-router-dom";

import Main from "../Main/Main";
import Forecast from "../Forecast/Forecast";

import "./Weather.scss";

class Weather extends Component<any> {
	public constructor(props) {
		super(props);
	}

	public render(): JSX.Element {
		const { currentForecasts } = this.props.weatherData;

		return (
			<div className="text-center text-white">
				<Main weatherData={this.props.weatherData} />
				{currentForecasts ? (
					<div className="text-left w-11/12 md:w-3/5 mt-14 mx-auto overflow-auto md:overflow-visible ">
						<div className="flex justify-between items-center">
							<span className="font-thin text-2xl">Prochaines heures</span>
							<Link to="/forecasts" className="cursor-pointer">
								Voir les prévisions de la semaine
							</Link>
						</div>

						<div className="flex justify-center gap-x-4 mt-8">
							{currentForecasts.hourly.slice(0, 6).map((forecast, index) => (
								<Forecast key={index} index={index} forecast={forecast} />
							))}
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default Weather;
