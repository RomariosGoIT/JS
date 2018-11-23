// let mark = {
//     height: 175,
//     mass: 85
// };

// let john = {
//     height: 185,
//     mass: 95
// };

// const bmiCalculate = (per1, per2) => {
//     let personOne = per1.mass / (per1.height * per1.height);
//     let personTwo = per2.mass / (per2.height * per2.height);
//     const result = personOne <= personTwo ? 'Mark\'s BMI higher than John\'s' : 'Mark\'s BMI is not higher than John\'s';

//     return console.log(result);
// };

// const result = bmiCalculate(John, Mark);

// let JohnTeam = 89 + 120 + 113;
// let MikeTeam = 116 + 94 + 123;
// let score;
// if (JohnTeam < MikeTeam) {
//     score = MikeTeam - JohnTeam;
//     console.log('Mike team wins with ' + score + ' score!');
// } else if (JohnTeam > MikeTeam) {
//     score = JohnTeam - MikeTeam;
//     console.log('John team wins with ' + score + ' score!');
// }

// const test = {
//     folder: 1,
//     folderTwo: [1, 2, 3, 4, 5]
// }

// let name = "John";
// let result = [];

// function first() {
//   let a = "Hello ";
//   second();
//   result.push(a + name);
// }

// function second() {
//   let c = "Hi ";
//   third();
//   result.push(c + name);
// }

// function third() {
//   let z = "Hey ";
//   result.push(z + name);
// }

// first();

// console.log(result);

// function calcutateAge(years) {
//   console.log(2018 - years);
// }

// calcutateAge(1983);

let a = "Hello ";

first();

function first() {
  let b = " Roma ";
  second(b);

  function second(b) {
    let c = "friend";
    third(c, b);
  }
}

function third(b, c) {
  let z = "best";
  console.log(a + b + c + z);
}
