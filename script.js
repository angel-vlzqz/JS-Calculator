function is_digit(c)
{
  return /^\d+$/.test(c);
};

function precedence(op)
{

  if (op == '+' || op == '-')
  {
    return 1;
  }
  if (op == '*' || op == '/' || op == '^')
  {
    return 2;
  }
  return 0;
}

// Function to perform arithmetic
// operations.
  function applyOp(a, b, op)
{

  if (op == '+') return a + b;
  if (op == '-') return a - b;
  if (op == '*') return a * b;
  if (op == '/') return a / b;
  if (op == '^') return a ** b;
}

// Function that returns value of
// expression after evaluation.
  function evaluate(tokens)
{

  // stack to store integer values.
    let values = [];

  // stack to store operators.
    let ops = [];
  let i = 0;

  while (i < tokens.length)
  {

    // Current token is a whitespace,
      // skip it.
      if (tokens[i] == ' ')
    {
      i += 1;
      continue
    }

    // Current token is an opening 
    // brace, push it to 'ops'
    else if (tokens[i] == '(')
      {
        ops.push(tokens[i]);
      }

      // Current token is a number, push 
      // it to stack for numbers.
      else if (is_digit(tokens[i]))
      {
        let val = 0;

        // There may be more than one
        // digits in the number.
          while (i < tokens.length && is_digit(tokens[i]))
        {
          val = (val * 10) + parseInt(tokens[i]);
          i += 1;
        }
        values.push(val);

        // right now the i points to 
        // the character next to the digit,
          // since the for loop also increases 
        // the i, we would skip one 
        // token position; we need to 
        // decrease the value of i by 1 to
        // correct the offset.
          i-=1;
      }

      // Closing brace encountered, 
      // solve entire brace.
      else if (tokens[i] == ')')
    {
      while (ops.length != 0 && ops[-1] != '(')
        {
          let val2 = values.pop();
          let val1 = values.pop();
          let op = ops.pop();

          values.push(applyOp(val1, val2, op));
        }

        // pop opening brace.
        ops.pop()
      }

    // Current token is an operator.
      else
    {
      // While top of 'ops' has same or 
      // greater precedence to current 
      // token, which is an operator. 
        // Apply operator on top of 'ops' 
      // to top two elements in values stack.
        while (ops.length != 0 && precedence(ops[-1]) >= precedence(tokens[i]))
      {

        let val2 = values.pop();
        let val1 = values.pop();
        let op = ops.pop();

        values.push(applyOp(val1, val2, op));
      }

      // Push current token to 'ops'.
        ops.push(tokens[i]);
    }
    i += 1;
  }

  // Entire expression has been parsed 
  // at this point, apply remaining ops 
  // to remaining values.
    while (ops.length != 0)
  {
    let val2 = values.pop();
    let val1 = values.pop();
    let op = ops.pop();

    values.push(applyOp(val1, val2, op));
  }
  // Top of 'values' contains result,
    // return it.
    return values[-1];
}

// Driver Code

console.log(evaluate("10 + 2 * 6"))
console.log(evaluate("100 * 2 + 12"))
console.log(evaluate("100 * ( 2 + 12 )"))
console.log(evaluate("100 * ( 2 + 12 ) / 14"))
console.log(evaluate("9 ^ 3"))
console.log(evaluate("9 ^ 3"))
console.log(evaluate("(2+1)^2"))

