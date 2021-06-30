const lookupBtn = document.querySelector(".lookup-btn");
const ipDisplay = document.querySelector(".ip-display");
const locationDisplay = document.querySelector(".location-display");
const geoDisplay = document.querySelector(".geo-location");
const loader = document.querySelector(".loader-container");
const details = document.querySelector(".details");

lookupBtn.addEventListener("click", () => {
 loader.style.display = "flex";
 details.style.display = "none";

 axios.get("http://ip-api.com/json/").then(response =>{
	 loader.style.display = "none";
	  details.style.display = "block";
	 ipDisplay.textContent = `Ip:${response.data.query}`;
     locationDisplay.textContent = `Location: ${response.data.city}, ${response.data.region}, ${response.data.country}`;
     geoDisplay.textContent = `Geo-Location: ${response.data.lat}, ${response.data.lon}`;
});  

});

