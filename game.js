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
