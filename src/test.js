
import {parse} from 'babylon';
import generate from 'babel-generator';
import traverse from "babel-traverse";

function prettyPrint(ast) {
  return generate(ast).code;
}

const visitor = {
  BinaryExpression(path) {
    console.log('binary exp', path.type, prettyPrint(path.node));
  },

  UnaryExpression(path) {
    console.log('unary exp', path.type, prettyPrint(path.node));
  }
};

const hi = () => {
  const ast = parse("!true + (+1)");

  // var r = require('repl').start('> ');
  // r.context.ast = ast;

  traverse(ast, visitor);
};

export { hi };
