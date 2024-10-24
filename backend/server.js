const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;  // "operator" or "operand"
        this.left = left;  // left child for operators
        this.right = right; // right child for operators
        this.value = value; // value for operand nodes (e.g., condition or comparison)
    }
}
// Function to parse a rule string and create a Node object
function create_rule(condition_string) {
    const conditionRegex = /(\w+)\s*(==|>|<|>=|<=)\s*(['"]?\w+['"]?|\d+)/;
    const match = condition_string.match(conditionRegex);

    if (!match) {
        throw new Error(`Invalid condition string: ${condition_string}`);
    }

    const attribute = match[1];
    const operator = match[2];
    let value = match[3];

    if (value.includes("'") || value.includes('"')) {
        value = value.replace(/['"]/g, '');
    }

    return new Node("operand", null, null, (user) => {
        switch (operator) {
            case '>':
                return user[attribute] > parseFloat(value);
            case '<':
                return user[attribute] < parseFloat(value);
            case '>=':
                return user[attribute] >= parseFloat(value);
            case '<=':
                return user[attribute] <= parseFloat(value);
            case '==':
                return user[attribute] == value;
            default:
                throw new Error("Unsupported operator");
        }
    });
}
function tokenize_rule_string(rule_string) {
    console.log("tokenize rule", rule_string
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .split(" ")
        .filter(token => token.trim().length > 0))
    return rule_string
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .split(" ")
        .filter(token => token.trim().length > 0);
}

function parse_tokens(tokens) {
    if (tokens.length === 0) {
        throw new Error("Invalid rule expression");
    }

    const stack = [];
    console.log("parese tokens", tokens)

    while (tokens.length > 0) {
        const token = tokens.shift();

        if (token === "(") {
            stack.push(parse_tokens(tokens));
        } else if (token === ")") {
            return stack.pop();
        } else if (token === "AND" || token === "OR") {
            const operator = token;
            const left = stack.pop();
            const right = parse_tokens(tokens);
            stack.push(new Node("operator", left, right, operator));
        } else {
            const operand = `${token} ${tokens.shift()} ${tokens.shift()}`;
            stack.push(create_rule(operand));
        }
    }

    return stack[0];
}

function combine_rules(rule_string) {
    const tokens = tokenize_rule_string(rule_string);
    return parse_tokens(tokens);
}

function evaluate_rule(node, user) {
    if (node.type === "operand") {
        return node.value(user);
    } else if (node.type === "operator") {
        if (node.value === "AND") {
            return evaluate_rule(node.left, user) && evaluate_rule(node.right, user);
        } else if (node.value === "OR") {
            return evaluate_rule(node.left, user) || evaluate_rule(node.right, user);
        }
    }
    return false;
}
// Express API
app.post('/checkEligibility', (req, res) => {
    const user = req.body;
    const rule1 = "(age > 30 AND department == 'sales') OR ((age < 25 AND department == 'marketing' AND salary > 50000) OR experience > 5)";
    const ast = combine_rules(rule1);
    console.log("user", user)
    const isEligible = evaluate_rule(ast, user);
    res.json({ eligible: isEligible });
});

app.listen(3000, () => console.log("Server is running on port 3000"));