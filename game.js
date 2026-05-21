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
  const giveReputation = () => { reputation++; }; 

  return { name, discordName, giveReputation, getReputation }; 
} 

const mindlo = createUser("mindlo"); 
mindlo.giveReputation(); 

console.log({ 
  discordName: mindlo.name, 
  reputation: mindlo.getReputation()  
}); 

const thamtham = createUser("thamtham"); 

thamtham.giveReputation(); 
thamtham.giveReputation(); 

console.log({ 
  dischordName: thamtham.name, 
  reputation: thamtham.getReputation()
}); 


const calculator = (() => { 
  let lastResult; 

  const add = (a, b) => { 
    lastResult = a + b; 
    return lastResult; 
  }; 

  const subtract = (a, b) => { 
    lastResult = a - b; 
    return lastResult; 
  }; 

  const multiply = (a, b) => { 
    lastResult = a * b; 
    return lastResult; 
  } 

  const divide = (a, b) => { 
    lastResult = a / b; 
    return lastResult; 
  } 

  const getLastResult = () => lastResult; 

  return { add, subtract, multiply, getLastResult }; 
})(); 

console.log(calculator.add(3, 5)); 
console.log(calculator.getLastResult()); 
  
