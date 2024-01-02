const button = document.querySelector("button");
const suhu = document.getElementById("suhu");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  const cityName = input.value;
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=RG3C38N9YUM9SLJNFAZX4NKKP&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      const data = response.json();
      data.then((data) => {
        suhu.innerHTML = data.currentConditions.temp + "°C";
      })
    })
    .catch((err) => {
      console.error(err);
    });
});
