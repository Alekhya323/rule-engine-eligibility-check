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
