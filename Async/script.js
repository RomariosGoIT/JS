const second = () => {
  setInterval(() => {
    console.log('Im last');
  }, 1000);
};
const first = () => {
  console.log('Im first');
  second();
  console.log('Im soncond');
};
