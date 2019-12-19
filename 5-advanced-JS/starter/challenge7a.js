var Question = function(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
    this.askQuestion = function() {
        console.log(this.question);
        for (var i = 0; i < this.choices.length; i++) {
            console.log(i + ': ' + this.choices[i]);
        }
    };
    this.isCorrect = function(guess) {
        if (guess == this.answer) {
            console.log('Correct!');
        } else {
            console.log('Wrong :(');
        }
        return guess == this.answer;
    };
}

var questions = [new Question('What best describes coding?', ['Boring', 'Hard', 'Fun', 'Tedious'], 2),
                 new Question('What is the name of the JS course teacher?', ['John', 'Jonas', 'Michael'], 1),
                 new Question('Is JavaScript the best programming language?', ['Yes', 'No'], 0)];
var score = 0;

function askQuestion() {
    var q = Math.floor(Math.random() * questions.length);
    questions[q].askQuestion();
    var guess= prompt('Which is the correct answer?');
    if (guess !== 'exit') {
        if (questions[q].isCorrect(guess)) {
            ++score;
        };
        console.log('Your score: ' + score);
        askQuestion();
    };
}

askQuestion();
