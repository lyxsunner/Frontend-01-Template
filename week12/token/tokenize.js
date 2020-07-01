const regexp = /([0-9]|(?:[1-9][0-9]*))|([ ]+)|([\r\n]+)|(\()|(\))|(\+)|(\-)|(\*)|(\/)/g
const dictionary = ['Number', 'Whitespace', 'LineTerminator', '(', ')', 'Punctuator', 'Punctuator', 'Punctuator', 'Punctuator'];

function* tokenize(source) {
  let result = null;
  let lastIndex = 0;
  while (result = regexp.exec(source)) {
    for (let i = 0; i < dictionary.length; i++) {
      if (result[i + 1]) {
        yield {
          index: result.index,
          value: result[i + 1],
          type: dictionary[i]
        }
      }
    }
    lastIndex = regexp.lastIndex;
  }
  yield { type: 'EOF' }
}

let stack = [{
  type: 'Expression',
  children: []
}];

/*
<Number> ::= "0" | "1" | "2" ....| "9"
<PrimaryExpression> ::= <Number> |
 "(" <AdditiveExpression> ")"
<MultiplicativeExpression> ::= <PrimaryExpression> |
  <MultiplicativeExpression> "*" <PrimaryExpression> |
  <MultiplicativeExpression> "/" <PrimaryExpression>
<AddtiveExpression> ::= <MultiplicativeExpression> |
  <AddtiveExpression> "+" <MultiplicativeExpression> |
  <AddtiveExpression> "-" <MultiplicativeExpression>
*/
function Expression(token) {
  if (token.type === 'Number') {
    stack.push({
      type: 'AdditiveExrpession',
      children: []
    })
    return AdditiveExrpession(token);
  } else if (token.type === '(') {
    stack.push({
      type: 'PrimaryExpression',
      children: []
    })
    return PrimaryExpression(token);
  } else if (token.type === 'EOF') {
    stack.push(token);
  }
  return Expression;
}

function PrimaryExpression(token) {
  if (token.type === '(') {
    return AdditiveExrpession;
  } else if (token.type === ')') {
    return MultiplicativeExpression(stack.pop());
  } else if (token.type === 'Number') {
    stack[stack.length - 1].children.push(token);
    return MultiplicativeExpression(stack.pop());
  }
}

function AdditiveExrpession(token) {
  if (token.type === 'Number') {
    stack.push({
      type: 'MultiplicativeExpression',
      children: []
    });
    return MultiplicativeExpression(token);
  } else if (token.type === '(') {
    stack.push({
      type: 'MultiplicativeExpression',
      children: []
    })
    return MultiplicativeExpression(token);
  } else if (token.type === ')') {
    const item = stack.pop();
    stack[stack.length - 1].children.push(item);
    return PrimaryExpression(token);
  } else if (token.type === 'Punctuator' && (token.value === '+' || token.value === '-')) {
    const item = stack.pop();
    stack[stack.length - 1].children.push(item);
    stack[stack.length - 1].children.push(token);
  } else if (token.type === 'EOF') {
    const item = stack.pop();
    stack[stack.length - 1].children.push(item);
    return Expression(token);
  }
  return AdditiveExrpession;
}

function MultiplicativeExpression(token) {
  if (token.type === 'Number') {
    stack.push({
      type: 'PrimaryExpression',
      children: []
    });
    return PrimaryExpression(token);
  } else if (token.type === 'PrimaryExpression') {
    stack[stack.length - 1].children.push(token);
  } else if (token.type === '(') {
    stack.push({
      type: 'PrimaryExpression',
      children: []
    })
    return PrimaryExpression(token);
  } else if (token.type === ')') {
    return AdditiveExrpession(token);
  } else if (token.type === 'Punctuator' && (token.value === '*' || token.value === '/')) {
    stack[stack.length - 1].children.push(token);
  } else if (token.type === 'Punctuator' && (token.value === '+' || token.value === '-')) {
    return AdditiveExrpession(token);
  } else if (token.type === 'EOF') {
    const item = stack.pop();
    stack[stack.length - 1].children.push(item);
    return AdditiveExrpession(token);
  }
  return MultiplicativeExpression;
}

function* AST(source) {
  let state = Expression;
  let tk = null;
  for (let token of tokenize(source)) {
    yield { stack, token };
    if (token.type === 'Whitespace') continue;
    if (token.type === 'LineTerminator') continue;
    state = state(token);
    tk = token;
  }
  yield { stack, token: tk };
  return stack[0];
}

// for (const item of AST('0 +  1 * (2 + 3) * 4')) {
//   console.log(item);
// }