// const second = () => {
//   setInterval(() => {
//     console.log('Im last');
//   }, 1000);
// };
// const first = () => {
//   console.log('Im first');
//   second();
//   console.log('Im soncond');
// };

const kiev = '924938';

let weather = {
  lodading: false,
  title: '',
  temperature: '',
};

const getWheather = async woid => {
  const result = await fetch(
    `https://www.metaweather.com/api/location/${woid}/`,
  );
  const data = await result.json();
  const today = data.consolidated_weather[0];
  weather.lodading = true;
  weather.title = data.title;
  weather.temperature = today.max_temp;
  console.log(
    `In ${data.title} weather is max temp ${today.max_temp}, and min temp is ${
      today.min_temp
    }`,
  );
  showWeather();
};

getWheather(kiev);

showWeather = () => {
  console.log(weather);
};
