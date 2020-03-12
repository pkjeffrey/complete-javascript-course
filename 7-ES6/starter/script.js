// let and const //////////////////////////////////////////////////

/*
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller'; // fails
console.log(name6);
*/

/*
// ES5
function driversLicence5(passedTest) {
    console.log(firstName); // undefined
    if (passedTest) {
        var firstName = 'John'; //var function scoped
        var yearOfBirth = 1990;
    }
    console.log(firstName, yearOfBirth);
}
driversLicence5(true);

// ES6
function driversLicence6(passedTest) {
    //console.log(firstName); // error firstName not defined
    let firstName;
    const yearOfBirth = 1990;
    if (passedTest) {
        firstName = 'John'; // let and const block scoped
    }
    console.log(firstName, yearOfBirth);
}
driversLicence6(true);

let i = 23;
for (let i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);
*/


// blocks and IIFEs ////////////////////////////////////////////
/*
{
    const a = 1;
    let b = 2;
    var c = 3;
}
// console.log(a); // fails
// console.log(b); // fails
console.log(c);
*/


// strings ///////////////////////////////////////////////////////
/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;
const calcAge = function(year) {
    return 2020 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes(' '));
console.log(firstName.repeat(5));
console.log(`${firstName} `.repeat(5));
*/


// arrow functions ////////////////////////////////////////////
/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2020 - el;
});
console.log(ages5);

// ES6
// single argument, single return statement
let ages6 = years.map(el => 2020 - el);
console.log(ages6);

// multiple arguments, single return statement
ages6 = years.map((el, idx) => `Age ${idx + 1}: ${2020 - el}`);
console.log(ages6);

// multiple arguments, multiple statements
ages6 = years.map((el, idx) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${idx + 1}: ${age}`;
});
console.log(ages6);

// lexical 'this'

// ES5
// restuls in 'This is box number undefined and it is undefined'
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() { // clickMe is method of object, 'this' in method is object
        document.querySelector('.green').addEventListener('click', function() { // event listener callback is a function, 'this' in function is global
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        })
    }
}
//box5.clickMe();

// restuls in 'This is box number 1 and it is green'
var box55 = {
    color: 'green',
    position: 1,
    clickMe: function() { // clickMe is method of object, 'this' in method is object
        var self = this;
        document.querySelector('.green').addEventListener('click', function() { // event listener callback is a function, 'this' in function is global
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        })
    }
}
//box55.clickMe();

// ES6
// restuls in 'This is box number 1 and it is green'
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() { // clickMe is method of object, 'this' in method is object
        document.querySelector('.green').addEventListener('click', () => { // arrow function has lexical 'this', being the containing thing - the clickMe method who's 'this' is object
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        })
    }
}
box6.clickMe();

// restuls in 'This is box number undefined and it is undefined'
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => { // arrow function has lexical 'this' = global 'this', as not in method
        document.querySelector('.green').addEventListener('click', () => { // arrow function has lexical 'this' - containing thing is arrow function who's 'this' is global
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        })
    }
}
//box66.clickMe();


function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {
    var f = friends.map(function(el) {
        return this.name + ' is friends with ' + el;
    }.bind(this)); // bind(this) is alternative to var self = this
    console.log(f);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function(friends) {
    const f = friends.map(el => `${this.name} is friends with ${el}`);
    console.log(f);
}
new Person('Mary').myFriends6(friends);
*/


// Destructuring /////////////////////////////////////////////////////

// ES5
var john = ['John', 26];
var name5 = john[0];
var age5 = john[1];

// ES6
const [name6, year6] = ['John', 26];
console.log(name6, year6);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};
const {firstName, lastName} = obj; // variable names match key names
console.log(firstName, lastName);

const {firstName: a, lastName: b} = obj; // variable names different from key names
console.log(a, b);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age, retirement] = calcAgeRetirement(1990);
console.log(age, retirement);