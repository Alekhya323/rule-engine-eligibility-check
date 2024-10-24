# Rule-Engine-Eligibility-Check
**Project Overview**
This project is a simple Rule-Based Eligibility Evaluation API built using Node.js and Express. The API evaluates whether a user satisfies a predefined set of eligibility rules.

The rules are parsed into an Abstract Syntax Tree (AST) and evaluated dynamically based on the user's data. The example in the project evaluates conditions such as age, department, salary, and experience to determine eligibility for certain criteria.

### Features 
1. Rule Parsing: Supports parsing of conditional rules in a human-readable format.
1. Dynamic Evaluation: Dynamically evaluates user eligibility based on the provided rule.
1. REST API: Exposes an API endpoint to check user eligibility.
1. Rule Composition: Supports complex rule compositions using AND/OR operators.

### Prerequisites
1. Before running the project, make sure you have:
1. Node.js installed on your machine.
1. npm (Node package manager) installed.

### Getting Started
1. Clone the Repository
```javascript
git clone <repository-url>
cd <project-directory>
```
2. Install Dependencies
Run the following command to install the required dependencies:
```javascript
npm install
```

3. Start the Server
To start the server, run:
```javascript
node server.js
```

The server will start on port 3000. You should see the following log:
```javascript
Server is running on port 3000
```
# API Usage
### Endpoint
The server exposes the following endpoint:
* `POST /checkEligibility`
Request
The API expects the user data to be sent in the request body in JSON format. Example:
```javascript
{
    "age": 35,
    "department": "sales",
    "salary": 60000,
    "experience": 3
}
```
Sample Eligibility Rule
The current eligibility rule being evaluated is:
```javascript
(age > 30 AND department == 'sales') 
OR 
((age < 25 AND department == 'marketing' AND salary > 50000) 
OR experience > 5)
```
This means:

* A user is eligible if:
1. They are older than 30 and work in the sales department OR
1. They are younger than 25, work in the marketing department, and have a salary greater than 50,000 OR
1. They have more than 5 years of experience.
Response
The API responds with a JSON object indicating whether the user is eligible or not:
```javascript
{
    "eligible": true
}
```
or
```javascript
{
    "eligible": false
}
```
# Example Request Using `curl`
You can test the API using `curl` as follows:
```javascript
curl -X POST http://localhost:3000/checkEligibility \
-H "Content-Type: application/json" \
-d '{"age": 35, "department": "sales", "salary": 60000, "experience": 3}'
```
Expected Response:
```javascript
{
    "eligible": true
}
```
# Project Structure
1. `index.js`: The main entry point of the project. It contains the rule parser, the AST evaluator, and the Express API endpoint.
1. `Node class`: Represents the AST nodes for both operators (AND, OR) and operands (comparison conditions).
# Rule Parsing and Evaluation
* The rules are tokenized using the tokenize_rule_string function, which breaks the rule string into tokens like age, >, 30, AND, etc.
* The tokens are parsed into an Abstract Syntax Tree (AST) with parse_tokens.
* The AST is evaluated recursively with evaluate_rule, traversing the tree based on the operators (AND, OR) and operands (conditions).
# Running Tests
While no specific test suite is included in this project, you can manually test the API using any HTTP client like curl, Postman, or browser-based REST clients.
# Dependencies
* Express: Web framework for building REST APIs.
* Cors: Middleware to handle Cross-Origin Resource Sharing.
# License
This project is licensed under the MIT License. Feel free to modify and use it in your own projects.

# Contributing
Contributions are welcome! Please fork the repository and create a pull request to submit your changes.





