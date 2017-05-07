
import {parse} from 'babylon';
import generate from 'babel-generator';

function prettyPrint(ast) {
  return generate(ast).code;
}

function visit(node, visitor) {
  return visitor.visit(node);
}

function traverse(node) {
  return visit(node, {

    visit(node) {
      const f = this[node.type];
      return f.call(this, node);
    },

    BinaryExpression(node) {
      return [traverse(node.left), node.operator, traverse(node.right)].join(' ');
    },

    NumericLiteral(node) {
      return node.value + '';
    },

    Program(node) {
      return node.body.map(traverse).join('\n');
    },

    ExpressionStatement(node) {
      return traverse(node.expression);
    },

    File(node) {
      return traverse(node.program);
    }
  })
}

function compile() {
  // const ast = parse("var a = 1 + 2");
  const ast = parse("1 + 2");

  // use babel-types, source-map
  return traverse(ast);
};

export { compile };
