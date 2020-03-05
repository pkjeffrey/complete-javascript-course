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
{
    const a = 1;
    let b = 2;
    var c = 3;
}
// console.log(a); // fails
// console.log(b); // fails
console.log(c);