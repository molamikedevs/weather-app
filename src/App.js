import React, { useState } from 'react'

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

export default function App() {
	return (
		<div className="container">
			<Main />
		</div>
	)
}

const getWeatherIcon = iconCode => {
	const iconMap = {
		'01d': 'clear.png',
		'01n': 'clear.png',
		'02d': 'clouds.png',
		'02n': 'clouds.png',
		'03d': 'clouds.png',
		'03n': 'clouds.png',
		'04d': 'clouds.png',
		'04n': 'clouds.png',
		'09d': 'rain.png',
		'09n': 'rain.png',
		'10d': 'rain.png',
		'10n': 'rain.png',
		'13d': 'snow.png',
		'13n': 'snow.png',
		'50d': 'mist.png',
		'50n': 'mist.png',
	}

	return iconMap[iconCode] || 'default.png'
}

const Main = () => {
	const [weather, setWeather] = useState(null)
	const [city, setCity] = useState('')
	const [error, setError] = useState('')

	const weatherData = async cityName => {
		const apiUrlWithKey = `${apiUrl}${cityName}&appid=${process.env.REACT_APP_API_KEY}`

		try {
			const response = await fetch(apiUrlWithKey)

			if (!response.ok) {
				console.error('Invalid response:', response.status)
				setError('Invalid city. Please enter a valid city name.')
				setWeather(null)
				return
			}

			const data = await response.json()
			console.log('API Response:', data)
			setWeather(data)
			setError('')
		} catch (error) {
			console.error('Error fetching weather data:', error)
			setError('Error fetching weather data. Please try again.')
			setWeather(null)
		}
	}

	const handleSearch = e => {
		if (e.key === 'Enter' || e.type === 'click') {
			weatherData(city)
			setCity('')
		}
	}

	return (
		<main className="main">
			<div>
				<div className="search">
					<input
						onChange={e => setCity(e.target.value)}
						type="text"
						placeholder="Enter city name"
						value={city}
						onKeyDown={handleSearch}
					/>

					<button onClick={handleSearch}>
						<img src="images/search.png" alt="search" />
					</button>
				</div>
				{error && <p className="error">{error}</p>}

				<h1>Weather Forecast</h1>
				{weather && (
					<>
						<h2>{weather.name}</h2>
						<div className="weather">
							<div className="col">
								<h3>{`Temperature ${weather.main.temp}°C`}</h3>
								<img
									src={`images/${getWeatherIcon(weather.weather[0].icon)}`}
									alt="weather"
								/>
							</div>
							<div className="col">
								<h3>{`Humidity ${weather.main.humidity}%`}</h3>
								<img src="images/humidity.png" alt="humidity" />
							</div>
							<div className="col">
								<h3>{`Wind Speed ${weather.wind.speed} km/`}h</h3>
								<img src="images/wind.png" alt="wind" />
							</div>
						</div>
					</>
				)}
			</div>
		</main>
	)
}
