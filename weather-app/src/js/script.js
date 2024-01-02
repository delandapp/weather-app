const button = document.querySelector("button");
const suhu = document.getElementById("suhu");
const cuaca = document.getElementById("cuaca");
const content = document.getElementById("content");
const kotak = document.getElementById("kotak");
const loading = document.getElementById("loading");

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
      suhu.previousElementSibling.previousElementSibling.innerHTML = data.resolvedAddress;
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
  loading.style.display = "flex";
  kotak.style.display = "none";
  loading.previousElementSibling.style.display = "none";
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
      data
        .then((data) => {
            suhu.previousElementSibling.previousElementSibling.innerHTML = data.resolvedAddress;
          loading.style.display = "none";
          kotak.style.display = "flex";
          loading.previousElementSibling.style.display = "none";
          suhu.innerHTML = data.currentConditions.temp + "°C";
          cuaca.innerHTML = data.currentConditions.conditions;
        })
        .catch((err) => {
        console.log("error")
          loading.style.display = "none";
          kotak.style.display = "none";
          loading.previousElementSibling.style.display = "block";
        });
    })
    .catch((err) => {
      kotak.style.display = "none";
    });
});
