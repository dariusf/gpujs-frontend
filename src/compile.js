
import {parse} from 'babylon';
import generate from 'babel-generator';
import traverse from "babel-traverse";

function prettyPrint(ast) {
  return generate(ast).code;
}

function compile() {
  const ast = parse("var a = 1 + 2");

  let buffer = [];

  traverse(ast, {
    VariableDeclaration(path) {
      path.node.declarations.forEach(n => {
        buffer.push('int');
        buffer.push(n.id.name);
        buffer.push('=');
      });
    },

    BinaryExpression(path) {
      console.log('bin exp');
      switch (path.node.operator) {
        case '+':
          buffer.push('+');
      }
    },

    NumericLiteral(path) {
      buffer.push(path.node.value);
    },
  
    enter(path) {
      // console.log('enter');
    },

    exit(path) {
      switch (path.type) {
        case 'VariableDeclaration':
          buffer.push(';');
      }
    }
  });

  return buffer.join(' ');
};

export { compile };
