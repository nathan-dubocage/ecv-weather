import { Component } from "react";

class Forecast extends Component<any> {
	public constructor(props: any) {
		super(props);
	}

	public render(): JSX.Element {
		const { forecast, index } = this.props;
		const currentDate = new Date(Date.now() + index * (3600 * 1000));
		const currentHour = currentDate.getHours();

		return (
			<div className="shrink-0 bg-blue-300 bg-opacity-5 rounded-md py-3 px-4">
				<div className="flex justify-between items-center gap-x-4">
					<div className="flex-1">
						<img
							src={`/assets/images/${forecast.weather[0].icon}.png`}
							alt={forecast.weather[0].description}
							className="w-10 h-10"
						/>
					</div>
					<div className="flex flex-col items-end gap-y-1">
						<span className="text-xs">{String(currentHour + 1).replace("24", "00")}:00</span>
						<span className="font-semibold">{Math.floor(forecast.temp)}°C</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Forecast;
