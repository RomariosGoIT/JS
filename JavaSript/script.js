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

// let a = "Hello ";

// first();

// function first() {
//   let b = " Roma ";
//   second(b);

//   function second(b) {
//     let c = "friend";
//     third(c, b);
//   }
// }

// function third(b, c) {
//   let z = "best";
//   console.log(a + b + c + z);
// }

// let num = 1;

// (goodLuck => {
//   let score = Math.random() * 10;
//   console.log(score > 5 - goodLuck);
// })(num);

///===================
// Lecture: Closures

// function retirement(retirementAge) {
//   const text = ' years left until retirement!';
//   return yearOfBirht => {
//     let age = 2018 - yearOfBirht;
//     console.log(retirementAge - age + text);
//   };
// }

// retirement(65)(1983);

// function interviewQuestion(job) {
//   const question = {
//     designer: ' can you please explain what UX disign about?',
//     teacher: 'What subject do you teach, ',
//     noJob: 'Hello, what do you do, ',
//   };
//   return function(name) {
//     switch (job) {
//       case 'designer':
//         console.log(name + question[job]);
//         break;
//       case 'teacher':
//         console.log(question[job] + name + '?');
//         break;
//       default:
//         console.log(question.noJob + name + '?');
//         break;
//     }
//   };
// }

// interviewQuestion('designer')('John');
// interviewQuestion('teacher')('Mark');
// interviewQuestion()('Andrey');

// const years = [1999, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn) {
//   let arrRes = [];
//   for (let i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// }

// function calculateAge(el) {
//   return 2018 - el;
// }

// function isFullAge(limit, el) {
//   console.log(el);
//   return el >= limit;
// }

// const ages = arrayCalc(years, calculateAge);
// console.log(ages);
// const fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
// console.log(fullJapan);

//CODING CHALLENGE

// let text = prompt('Test');

/*
--- Let's build a fun quiz game in the console! ---
1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor
3. Store them all inside an array
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

// const questions = [
//   {
//     question: "What is the name of this course's teacher?",
//     answers: ['John', 'Michel', 'Jonas'],
//     correct: 2,
//   },
//   {
//     question: 'JavaScript the coolest programing langueage in the world?',
//     answers: ['Yes', 'No'],
//     correct: 0,
//   },
//   {
//     question: 'What does best describe coding?',
//     answers: ['Boring', 'Hard', 'Fun', 'Tedios'],
//     correct: 1,
//   },
// ];

// (function() {
//   function Question({ question, answers, correct }) {
//     (this.question = question), (this.answers = answers);
//     this.correct = correct;
//   }

//   Question.prototype.showQuestion = function() {
//     console.log(this.question);

//     for (let i = 0; i < this.answers.length; i++) {
//       console.log(i + ':' + this.answers[i]);
//     }
//   };

//   let userScore = 0;

//   Question.prototype.checkAnswers = function(an) {
//     if (an === this.correct) {
//       userScore++;
//       console.log('Correct answer!');
//       console.log('Your score: ' + userScore);
//     } else {
//       console.log('Wrong answer! Try again!');
//       console.log('Your score: ' + userScore);
//     }

//     console.log('=====================================');
//   };

//   function createQuestionObject(arr) {
//     let newArr = [];
//     for (let i = 0; i < arr.length; i++) {
//       newArr.push(new Question(arr[i]));
//     }
//     return newArr;
//   }

//   const questionArray = createQuestionObject(questions);

//   function startGame() {
//     let random = Math.floor(Math.random() * questionArray.length);
//     questionArray[random].showQuestion();
//     let userAnswer = prompt('Your answer?');

//     if (userAnswer !== 'exit' && userAnswer !== null) {
//       questionArray[random].checkAnswers(parseInt(userAnswer));

//       startGame();
//     }

//     if (!userAnswer) {
//       if (userScore <= 0) {
//         console.log("You haven't even tried ((");
//       } else {
//         console.log('Thanks for your game!');
//       }
//       console.log('Your score: ' + userScore);
//     }
//   }

//   startGame();
// })();

/*
--- Let's build a fun quiz game in the console! ---
1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor
3. Store them all inside an array
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
/*
--- Expert level ---
8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)
9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
11. Display the score in the console. Use yet another method for this.
*/

///// NEW TRY

const questionsArray = [
  {
    question: "What is the name of this course's teacher?",
    answers: ['John', 'Michel', 'Jonas'],
    correct: 2,
  },
  {
    question: 'JavaScript the coolest programing langueage in the world?',
    answers: ['Yes', 'No'],
    correct: 0,
  },
  {
    question: 'What does best describe coding?',
    answers: ['Boring', 'Hard', 'Fun', 'Tedios'],
    correct: 1,
  },
];

function Question({ question, answers, correct }) {
  this.question = question;
  this.answers = answers;
  this.correct = correct;
}

Question.prototype.showQuestion = function() {
  console.log(this.question);

  for (let i = 0; i < this.answers.length; i++) {
    console.log(i + ': ' + this.answers[i]);
  }
};

Question.prototype.checkCorrect = function(anwser, fn) {
  let sc;
  if (anwser === this.correct) {
    console.log('Correct answer!');
    sc = fn(true);
  } else {
    console.log('Wrong answer!');
    sc = fn(false);
  }

  this.showUserScore(sc);
};

Question.prototype.showUserScore = function(sc) {
  console.log('Your score: ' + sc);
  console.log('===============================');
};

function score() {
  let sc = 0;
  return function(correct) {
    if (correct) {
      sc++;
    }
    return sc;
  };
}

let keepScore = score();

function createQuestionObject(arr) {
  let questionArr = [];
  for (i = 0; i < arr.length; i++) {
    questionArr.push(new Question(arr[i]));
  }
  return questionArr;
}

const questions = createQuestionObject(questionsArray);

function startGame() {
  let random = Math.floor(Math.random() * questions.length);
  questions[random].showQuestion();
  let userAnser = prompt('Yours answer!');
  if (userAnser !== 'exit' && userAnser !== null) {
    questions[random].checkCorrect(parseInt(userAnser), keepScore);

    startGame();
  }
}

startGame();
