var johnScores = [89, 120, 103];
var mikeScores = [116, 94, 123];
var maryScores = [97, 134, 105];
var sum = (a, v) => a + v;

var johnAverage = johnScores.reduce(sum) / johnScores.length;
console.log(johnAverage);

var mikeAverage = mikeScores.reduce(sum) / mikeScores.length;
console.log(mikeAverage);

var winner = johnAverage > mikeAverage ? 'John' : 'Mike';
var winAvg = johnAverage > mikeAverage ? johnAverage : mikeAverage;
if (johnAverage === mikeAverage) {
    console.log("John and Mike draw with score of " + johnAverage);
} else {
    console.log(winner + ' wins with score of ' + winAvg);
}

var maryAverage = maryScores.reduce(sum) / maryScores.length;
console.log(maryAverage);