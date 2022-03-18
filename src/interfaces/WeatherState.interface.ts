export interface WeatherState {
	weather?: WeatherInterface;
	forecasts?: ForecastInterface;
	searchVisible?: boolean;
	searchValue?: string;
	isExistCity?: boolean;
	isAlreadyFavorite?: boolean;
}

export interface WeatherInterface {
	name?: string;
	main?: {
		temp?: number;
	};
	weather?: [
		{
			icon?: string;
			description?: string;
		}
	];
	wind?: {
		speed?: number;
	};
	coord?: {
		lon?: number;
		lat?: number;
	};
}

export interface ForecastInterface {
	hourly?: [
		{
			temp?: number;
			weather?: [
				{
					icon: string;
				}
			];
		}
	];
}
