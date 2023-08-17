// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown')

// TODO: Create an array of questions for user input
const questions = [
    {
        name: 'project_title',
        type: 'input',
        message: 'What is the title of your project?'
      },
      {
        name: 'project_description',
        type: 'input',
        message: 'Please provide a description of your project:'
      },
      {
        name: 'install_instruct',
        type: 'input',
        message: 'Please provide installation instructions:'
      },
      {
        name: 'usage',
        type: 'input',
        message: 'How should the project be used?'
      },
      {
        name: 'contributing',
        type: 'input',
        message: 'How can others contribute to the project?'
      },
      {
        name: 'tests',
        type: 'input',
        message: 'Please provide any testing instructions:'
      },
      {
        name: 'github_link',
        type: 'input',
        message: 'Please enter your GitHub profile link:'
      },
      {
        name: 'email',
        type: 'input',
        message: 'Please enter your email address:'
      },
      {
        name: 'selected_license',
        type: 'list',
        message: 'Select a license:',
        choices: ['Option 1', 'Option 2', 'Option 3']
      }
];

// TODO: Create a function to write README file
function writeREADME(readmeContent) {
    fs.writeFile('./utils/README.md', readmeContent, function (err) {
      if (err) throw err;
      console.log('README file created successfully.');
    });
  }




// Function to prompt the next question
function promptNextQuestion(index, answers) {
    if (index === questions.length) {
      // All questions have been answered, generate the README content and write the file
      console.log('All questions answered:', answers);

      const readmeContent = `

# ${answers.project_title}

## Introduction

${answers.project_description}

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation
...

## Usage
...

## License
...

## Installation

Use the following command to install the project dependencies:

\`\`\`
npm install
\`\`\`

## Usage

To run the project, use the following command:

\`\`\`
npm start
\`\`\`

## Contributing

Contributions are welcome! Please follow the guidelines.

## License

This project is licensed under the MIT License.

[Visit my website](https://www.example.com "My Website")
  `;
      writeREADME(readmeContent);
    } else {
      // Prompt the next question
      inquirer.prompt([questions[index]]).then(answer => {
        // Store the answer in the answers object
        Object.assign(answers, answer);
        // Prompt the next question
        promptNextQuestion(index + 1, answers);
      });
    }
  }

// TODO: Create a function to initialize app
function init() {
    const answers = {};
    promptNextQuestion(0, answers);
  }


// Function call to initialize app
init();