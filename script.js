async function getWeather() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();
    const resultDiv = document.getElementById("weather-result");
    
    if (!city) return;
    
    // Add loading state or hide previous result briefly
    resultDiv.classList.remove("show");
    
    const apiKey = "cb618880920c88e9cf2245b99c1bdcd9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        setTimeout(() => {
            if (data.cod === 200) {
                resultDiv.innerHTML = `
                    <div class="city-name">${data.name}, ${data.sys.country}</div>
                    <div class="temperature">${Math.round(data.main.temp)}°C</div>
                    <div class="description">${data.weather[0].description}</div>
                `;
            } else {
                resultDiv.innerHTML = `<div class="error-msg">City not found. Please try again.</div>`;
            }
            resultDiv.classList.add("show");
        }, 300); // slight delay for animation
        
    } catch (error) {
        console.error("Error fetching data:", error);
        setTimeout(() => {
            resultDiv.innerHTML = `<div class="error-msg">An error occurred. Please check your connection.</div>`;
            resultDiv.classList.add("show");
        }, 300);
    }
}

// Allow pressing Enter to search
document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
