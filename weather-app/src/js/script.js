const button = document.querySelector("button");
const suhu = document.getElementById("suhu");
const cuaca = document.getElementById("cuaca");
const content = document.getElementById("content");
const kotak = document.getElementById("kotak");

fetch(
  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Jakarta?unitGroup=metric&key=RG3C38N9YUM9SLJNFAZX4NKKP&contentType=json`,
  {
    method: "GET",
    headers: {},
  }
)
  .then((response) => {
    const data = response.json();
    data.then((data) => {
      suhu.innerHTML = data.currentConditions.temp + "°C";
      cuaca.innerHTML = data.currentConditions.conditions;
      content.style.display = "flex";
    });
  })
  .catch((err) => {
    console.error(err);
  });

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
  ).then((response) => {
      const data = response.json();
      data.then((data) => {
        kotak.style.display = "flex";
        kotak.previousElementSibling.style.display = "none";
        suhu.innerHTML = data.currentConditions.temp + "°C";
        cuaca.innerHTML = data.currentConditions.conditions;
      }).catch((err) => {
        kotak.style.display = "none";
        kotak.previousElementSibling.style.display = "block";
      });
    }).catch((err) => {
        kotak.style.display = "none";
    });
});
