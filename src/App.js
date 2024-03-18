import React, { useState } from 'react'

const apiKey = '1e6d21df72f644aba4f5e7f77a7f32bd'
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
		try {
			const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`)
			if (!response.ok) {
				console.error('Invalid city or error in response:', response.status)
				setError('Invalid city. Please enter a valid city name.')
				setWeather(null)
				return
			}
			const data = await response.json()
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
								<h3>{`Temperature ${weather.main.temp} 60°C`}</h3>
								<img
									src={`images/${getWeatherIcon(weather.weather[0].icon)}`}
									alt="weather"
								/>
							</div>
							<div className="col">
								<h3>{`Humidity ${weather.main.humidity} 78%`}</h3>
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
