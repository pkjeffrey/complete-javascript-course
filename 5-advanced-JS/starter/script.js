// Function constructor

// var Person = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
//     // this.calculateAge = function() {          // better to add function to prototype, as per below
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
// (function (goodLuck) {
//     var score = Math.random() * 10;
//     console.log(score >= 5 - goodLuck);
// })(4);

// Closures

/* Closure:
   An inner function always has access to
   the variables and parameters of it's outer
   function, even after the outer function
   has returned.
*/

// function retirement(retirementAge) {
//     var msg = ' years left until retirement.';
//     return function(yearOfBirth) {
//         var age = 2019 - yearOfBirth;
//         console.log((retirementAge - age) + msg);
//     }
// }

// var retirementUS = retirement(66);
// var retirementGermany = retirement(65);
// var retirementIceland = retirement(67);
// retirementUS(1968);
// retirementGermany(1968);
// retirementIceland(1968);

// // rewrite interviewQuestion function using closures
// function interviewQuestion(job) {
//     return function(name) {
//         if (job === 'designer') {
//             console.log(name + ', can you please explain what UX design is?');
//         } else if (job === 'teacher') {
//             console.log('What subject do you teach, ' + name + '?');
//         } else {
//             console.log('Hello ' + name + ', what do you do?');
//         }
//     }
// }

// var teacherQuestion = interviewQuestion('teacher');
// teacherQuestion('John');

// interviewQuestion('designer')('Mark');

// Bind, call and apply
// (methods of functions)

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', ladies and gentlement! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('friendly', 'afternoon');
john.presentation.call(emily, 'formal', 'morning');
john.presentation.apply(emily, ['friendly', 'evening']);
var emilyFriendly = john.presentation.bind(emily, 'friendly');
emilyFriendly('night');
