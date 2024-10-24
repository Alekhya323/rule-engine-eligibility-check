const express = require('express');
const cors=require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Define a Node for AST
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;  // "operator" or "operand"
        this.left = left;  // left child for operators
        this.right = right; // right child for operators
        this.value = value; // value for operand nodes (e.g., condition or comparison)
    }
}

// Example: Simple condition node
const ageCondition = new Node("operand", null, null, (user) => user.age > 30);
const departmentCondition=new Node("operand",null,null,(user) =>user.department='Sales');
const combinedConditionOne_one_one=new Node("operator",ageCondition, departmentCondition, "AND");

const ageCondition2 = new Node("operand", null, null, (user) => user.age < 25);
const departmentCondition2=new Node("operand",null,null,(user) =>user.department='Marketing');
const combinedConditionOne_one_two=new Node("operator",ageCondition2, departmentCondition, "AND");

const combinedConditionOne_one=new Node("operator",combinedConditionOne_one_one, combinedConditionOne_one_two, "OR");

const incomeCondition = new Node("operand", null, null, (user) => user.income > 50000);
const experienceCondition=new Node("operand",null,null,(user) =>user.experience>5);
const combinedConditionOne_two=new Node("operator",incomeCondition, experienceCondition, "OR");

const combinedConditionOne=new Node("operator",combinedConditionOne_one, combinedConditionOne_two, "AND");




const combinedConditionTwo_one=new Node("operator",ageCondition, departmentCondition2, "AND");

const incomeCondition2 = new Node("operand", null, null, (user) => user.income > 20000);
const combinedConditionTwo_two=new Node("operator",incomeCondition2, experienceCondition, "OR");
const combinedConditionTwo=new Node("operator",combinedConditionTwo_one, combinedConditionTwo_two, "AND");





const combinedCondition=new Node("operator",combinedConditionOne, combinedConditionTwo, "OR");


// Example: AST for (age > 18 AND income > 30000)
// Function to evaluate the AST
function evaluateRule(node, user) {
    if (node.type === "operand") {
        return node.value(user); // Evaluate the condition with the user data
    } else if (node.type === "operator") {
        if (node.value === "AND") {
            return evaluateRule(node.left, user) && evaluateRule(node.right, user);
        } else if (node.value === "OR") {
            return evaluateRule(node.left, user) || evaluateRule(node.right, user);
        }
    }
    return false;
}

app.post('/checkEligibility', (req, res) => {
    const user = req.body;

    const isEligible = evaluateRule(combinedCondition, user);

    res.json({ eligible: isEligible });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
