window,addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDesc = document.querySelector(".temp-description");
    let temperatureDegree = document.querySelector(".temp-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let tempSec = document.querySelector(".degreeSec"); 
    const tempSpan = document.querySelector(".degreeSec span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lat, long);
            const proxy = `https://cors-anywhere.herokuapp.com/`;
        
         /*  if running locally add a proxy to bypass CORS issue */
       //   const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
           
         /* if deployed use without proxy */
            const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            console.log(api);
           
            fetch(api).then(response => {
                return response.json();
            }).then(data=> {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDesc.textContent = summary;
                locationTimezone.textContent = data.timezone;

                let celsius = ((temperature -32) * (5/9)).toFixed(2);
                setIcons(icon, document.querySelector(".icon"));

                tempSec.addEventListener('click', () => {
                    if(tempSpan.textContent === "F") {
                        tempSpan.textContent = "C";
                        temperatureDegree.textContent = celsius;
                    } else {
                        tempSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });
    } else {
        h1.textContent = "enable geo access";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});