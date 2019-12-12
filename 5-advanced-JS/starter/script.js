// Function constructor

// var Person = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
//     // this.calculateAge = function() {
//     //     console.log(2019 - this.yearOfBirth);
//     // }
// };

// Person.prototype.calculateAge = function() {
//     console.log(2019 - this.yearOfBirth);
// };

// var john = new Person('John', 1990, 'teacher');
// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retired');


// Object.create

// var personProto = {
//     calculateAge: function() {
//         console.log(2019 - this.yearOfBirth);
//     }
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
//         name: {value: 'Jane'},
//         yearOfBirth: {value: 1969},
//         job: {value: 'designer'}
//     });

// Functions taking functions

// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn) {
//     var arrResult = [];

//     for (var i = 0; i < arr.length; i++) {
//         arrResult.push(fn(arr[i]));
//     }

//     return arrResult;
// }

// function calculateAge(year) {
//     return 2019 - year;
// }

// function isFullAge(age) {
//     return age >= 18;
// }

// function maxHeartRate(age) {
//     if (age >= 18 && age <= 81)
//         return Math.round(206.9 - 0.67 * age);
//     else
//         return -1;
// }

// var ages = arrayCalc(years, calculateAge);
// var fullAges = arrayCalc(ages, isFullAge);
// console.log(ages, fullAges);
// console.log(arrayCalc(ages, maxHeartRate));

// Functions returning functions

// function interviewQuestion(job) {
//     if (job === 'designer') {
//         return function(name) {
//             console.log(name + ', can you please explain what UX design is?');
//         }
//     } else if (job === 'teacher') {
//         return function(name) {
//             console.log('What subject do you teach, ' + name + '?');
//         }
//     } else {
//         return function(name) {
//             console.log('Hello ' + name + ", what do you do?");
//         }
//     }
// }

// var teacherQuestion = interviewQuestion('teacher');
// teacherQuestion('John');

// interviewQuestion('designer')('Mark');

// Immediately Invoked Function Expressions (IIFE)

// (function () {
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// })();
(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(4);
