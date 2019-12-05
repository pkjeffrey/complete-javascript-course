///////////////////////////////////////
// Lecture: Hoisting

















///////////////////////////////////////
// Lecture: Scoping


// First scoping example
// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         console.log(a + b + c);
//     }
// }




// Example to show the differece between execution stack and scope chain
// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         third()
//     }
// }

// function third() {
//     var d = 'John';
//     //console.log(a + b + c + d); // b and c not available (due to lexical scoping)
//     console.log(a + d);
// }




///////////////////////////////////////
// Lecture: The this keyword

// console.log(this); // window object
// calcAge(1985);

// function calcAge(year) {
//     console.log(2019-year);
//     console.log(this); // again, window object (regular function, not object method)
// }

// var john = {
//     name: 'John',
//     birthdate: 1990,
//     calcAge: function() {
//         console.log(this); // john object
//         calcAge(this.birthdate);
//         function inner() {
//             console.log(this); // window object (regular function)
//         }
//         inner();
//     }
// }
// john.calcAge();

var person = {
    calcAge: function() {
        console.log(2019 - this.birthYear); // this only assigned when method called
    }
}

var john = {
    name: 'John',
    birthYear: 1990,
    calcAge: person.calcAge
}

var mike = {
    name: 'Mike',
    birthYear: 1985,
    calcAge: person.calcAge
}

john.calcAge();
mike.calcAge();
