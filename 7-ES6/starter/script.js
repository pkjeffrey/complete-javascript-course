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
/*
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
*/


// Arrays //////////////////////////////////////////////////////////
/*
const boxes = document.querySelectorAll('.box');

// ES5
var boxesArray5 = Array.prototype.slice.call(boxes);
boxesArray5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});

// ES6
const boxesArray6 = Array.from(boxes);
boxesArray6.forEach(cur => cur.style.backgroundColor = 'orangeRed');
// or
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// ES5
for(var i = 0; i < boxesArray5.length; i++) {
    if (boxesArray5[i].className === 'box blue') {
        continue;
    }
    boxesArray5[i].textContent = 'I changed to blue!';
}

// ES6
for(const cur of boxesArray6) {
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}

// ES5
var ages = [12, 17, 8, 21, 14, 11];
var full5 = ages.map(function(cur) {
    return cur >= 18;
});
console.log(full5.indexOf(true));
console.log(ages[full5.indexOf(true)]);

// ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
*/


// spread operator //////////////////////////////////////////
/*
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}
var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages); // ... = spread operator
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Anne'];
const familyBig = [...familySmith, ...familyMiller];
console.log(familyBig);

const h = document.querySelector('h1');
const b = document.querySelectorAll('.box');
Array.from([h, ...b]).forEach(cur => cur.style.color = 'purple'); // Array.from not neccessary
[h, ...b].forEach(cur => cur.style.color = 'white');
*/


// rest parameters ////////////////////////////////////////////
/*
// ES5
function isFullAge5() {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(cur) {
        console.log((2016 - cur) >= 18);
    })
}
isFullAge5(1990, 1999, 1965);

// ES6
function isFullAge6(...years) { // ... = rest parameters as well as spread operator
    years.forEach(cur => console.log((2016 - cur) >= 18));
}
isFullAge6(1990, 1999, 1965);

// ES5
function isFullAge5(limit) {
    var args = Array.prototype.slice.call(arguments, 1); // skip the limit argument
    args.forEach(function(cur) {
        console.log((2016 - cur) >= limit);
    })
}
isFullAge5(16, 1990, 1999, 1965);

// ES6
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log((2016 - cur) >= limit));
}
isFullAge6(16, 1990, 1999, 1965);
*/


// default parameters ////////////////////////////////////
/*
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    lastName = lastName === undefined ? 'Smith' : lastName;
    nationality = nationality ? nationality : 'American';

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
*/


// maps //////////////////////////////////////////////////
/*
const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer!');
question.set(false, 'Wrong, please try again.');

console.log(question.get('question'));
// console.log(question.has(4));
// question.delete(4);
// console.log(question.has(4));
// question.clear();

//question.forEach((value, key) => console.log(`Key ${key} has the value of ${value}`));
// for (let [key, value] of question.entries()) {
//     console.log(`Key ${key} has the value of ${value}`);
// }

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));

console.log(question.get(question.get('correct') === ans));
*/


// classes ////////////////////////////////////////////////
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
Person5.prototype.calcAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');

// ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calcAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    static greeting() {
        console.log('Hello.');
    }
}

const john6 = new Person6('John', 1990, 'teacher');
Person6.greeting();
*/


// inheritance ///////////////////////////////////////////
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
Person5.prototype.calcAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}
var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}
Athlete5.prototype = Object.create(Person5.prototype);
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}
var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

// ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calcAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}
class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}
const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
*/


// CODING CHALLENGE ////////////////////////////////////////////////////////
/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
    age() {
        return new Date().getFullYear() - this.buildYear;
    }
}
class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area;
        this.numTrees = numTrees;
    }
    treeDensity() {
        return this.numTrees / this.area;
    }
}
class Street extends Element {
    constructor(name, buildYear, length, size = 'normal') {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}
const parks = [
    new Park('Green Park', 1988, 0.43, 460),
    new Park('National Park', 1890, 4.1, 4900),
    new Park('Oak Park', 1968, 0.38, 900)
];
const streets = [
    new Street('Ocean Avenue', 1990, 1.9, 'big'),
    new Street('Evergreen Street', 2008, 0.5, 'small'),
    new Street('4th Street', 2015, 0.9),
    new Street('Sunset Boulevard', 1982, 3.8, 'huge')
];
console.log('----PARKS REPORT----');
console.log(`Our ${parks.length} parks have an average age of ${parks.map(park => park.age()).reduce((acc, age) => acc + age) / parks.length} years.`);
parks.forEach(park => console.log(`${park.name} has a tree density of ${park.treeDensity()} trees per square km.`));
parks.filter(park => park.numTrees > 1000).forEach(park => console.log(`${park.name} has more than 1000 trees.`));
console.log('----STREETS REPORT----');
const totalStreetLength = streets.reduce((acc, street) => acc + street.length, 0);
console.log(`Our ${streets.length} streets have a toal length of ${totalStreetLength} km, with an average of ${totalStreetLength / streets.length} km.`);
streets.forEach(street => console.log(`${street.name}, built in ${street.buildYear}, is a ${street.size} street.`));
