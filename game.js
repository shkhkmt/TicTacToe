function gameboard () { 
} 

function player (name, marker) {  
  return {name, marker};
} 

const player1 = player('Mangaliso', 'X'); 

console.log(player1); 

function game () {

}

// This is a global variable 

let globalAge = 23; 

// This is a function and a curly brace pair indicating a block 

function printAge(age) { 
  // This is a function scoped variable. 
  var varAge = 34; 

  // This is another curly brace i.e., a block 
  if (age > 0) { 
    // This is a block-scoped variable that exists within 
    // the nearest enclosing block: the if's block. 
    const constAge = age * 2; 
    console.log(constAge); 
  } 

  // ERROR! We tried to access a block scoped variable outside it's scope. 
  console.log(varAge); 
} 

printAge(globalAge); 

// ERROR! We tried to access a function scoped variable outside
// the function it's defined in. 

function makeAddingFunction(firstNumber) { 
  // firstNumber is scoped anywher within makeAddingFunction, including 
  // the returned function. 
  // any variables declared here will also be accessible within the returned
  // function. 

  // We don't need to name the returned function 
  // this is just to reference more easily in the explanation
  return function returnedFunction(secondNumber) { 
    // secondNumber is scoped only within the returnedFunction
    return firstNumber + secondNumber; 
  } 
} 

const add5 = makeAddingFunction(5); 
console.log(add5(15)); 

const add12345 = makeAddingFunction(12345); 


console.log(add12345(166)); 

const obj = {a: 1, b:2, c: (a, b) => a * b};

const {a , b, c} = obj; 

console.log(a); 
console.log(b); 
console.log(c(88, 21)); 

const array = [1, 2, 3, 4, 5]; 

// equivalent of doing 
// const zerothEle = array[0] 
// const firstEle = array[1] 

const [zerothEle, firstEle] = array; 
console.log(zerothEle); 

function createUser(name) { 
  const discordName = "@" + name; 

  let reputation = 0; 
  const getReputation = () => reputation; 
  const giveReputation = () => {reputation++};

  return {name, discordName, getReputation, giveReputation}; 
} 

const mindlo = createUser('Mindlo') 
mindlo.giveReputation(); 
mindlo.giveReputation(); 
// console.log(mindlo.getReputation()); 
//console.log(mindlo); 

console.log({ 
  discordName: mindlo.discordName, 
  reputation: mindlo.getReputation()
}); 

function createPlayer(name, level) { 
  const {getReputation, giveReputation} = createUser(name); 

  const increaseLevel = () => {level++; }; 

  return {name, getReputation, giveReputation, increaseLevel, level }; 
} 
  
createPlayer(mindlo); 
console.log(mindlo);  
const zPlayer = createPlayer('Zeus', 40); 

zPlayer.giveReputation(); 
zPlayer.increaseLevel();

console.log(zPlayer.level);

console.log({ 
  player: zPlayer.name, 
  level: zPlayer.level, 
  reputation: zPlayer.getReputation() 
}) 

console.log(zPlayer); 

function makeMultiplier(firstNumber) { 
  return function returnedFunction(secondNumber) { 
    return firstNumber * secondNumber; 
  }
}

const multi5 = makeMultiplier(5); 

console.log(multi5(6)); 
