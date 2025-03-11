// const numberButtons = document.querySelectorAll(".number_button");
// const data = {
//   runningSum: "",
// };

// function updateView(elementId) {
//   document.getElementById(elementId).textContent = data.runningSum;
//   console.log("updating view", data.runningSum);
// }

// function updateRunningSum(value) {
//   data.runningSum += value;
//   updateView("runningSum");
// }

// numberButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     updateRunningSum(e.target.textContent);
//   });
// });

class Node{
    constructor(val = null, left = null, right = null){
    this.val = val;
    this.left = left;
    this.right = right;
    }
    }


// Function to convert an infix expression to postfix using the Shunting-yard algorithm.
function infixToPostfix(infix) {
    // Tokenize the input using a regular expression:
    // This splits the expression into numbers, operators, and parentheses.
    const tokens = infix.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g);
    if (!tokens) return [];
  
    const outputQueue = [];
    const operatorStack = [];
    // Define operator precedence.
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  
    tokens.forEach((token) => {
      // If the token is a number, add it to the output queue.
      if (!isNaN(token)) {
        outputQueue.push(token);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        // Pop from the stack to the output queue until you find '('.
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== '('
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop(); // Remove the '(' from the stack.
      } else {
        // The token is an operator.
        // While there is an operator at the top of the stack with greater or equal precedence,
        // pop it to the output queue.
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== '(' &&
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
    });
  
    // Pop any remaining operators onto the output queue.
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }
    return outputQueue;
  }
  
  // Function to evaluate a postfix expression.
  function evaluatePostfix(postfixTokens) {
    const stack = [];
    postfixTokens.forEach((token) => {
      if (!isNaN(token)) {
        // Push numbers onto the stack.
        stack.push(parseFloat(token));
      } else {
        // The token is an operator; pop two numbers off the stack.
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case '+':
            stack.push(a + b);
            break;
          case '-':
            stack.push(a - b);
            break;
          case '*':
            stack.push(a * b);
            break;
          case '/':
            stack.push(a / b);
            break;
        }
      }
    });
    return stack.pop();
  }
  
  // Master function to evaluate an infix expression.
  function evaluateExpression(expr) {
    const postfix = infixToPostfix(expr);
    const result = evaluatePostfix(postfix);
    return result;
  }
  
  // Attach an event listener to the equals button.
  // (Assumes the global "data" object is already defined by the inline script.)
  const equalsButton = document.querySelector(".equals");
  equalsButton.addEventListener("click", () => {
    const result = evaluateExpression(data.displayString);
    data.displayString = result.toString();
    data.updateDisplay();
  });
  