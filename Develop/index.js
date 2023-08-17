// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');


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
        name: 'github_username',
        type: 'input',
        message: 'Please enter your GitHub Username:'
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
        choices: ['GPL', 'CC BY', 'MIT']
      }
];

// TODO: Create a function to write README file
function writeREADME(readmeContent, answers) {
  const userDirectory = `./userREADME/${answers.github_username}`;


  if (!fs.existsSync(userDirectory)) {
    fs.mkdirSync(userDirectory, { recursive: true });
  }

  fs.writeFile(`${userDirectory}/README.md`, readmeContent, function (err) {
    if (err) throw err;
    console.log('README file created successfully.');
  });
}




// Function to ask the next question
function promptNextQuestion(index, answers) {
    if (index === questions.length) {
      // All questions have been answered, generate the README content and write the file
      console.log('All questions answered:', answers);

//define the proper license
      if (answers.selected_license === 'GPL') {
        var license_Type = 'A copyleft license that ensures the freedom to use, modify, and distribute software while requiring any derivative work or software using GPL-licensed code to be released under the GPL as well. [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
      } else if (answers.selected_license === 'CC BY') {
        var license_Type = 'CC BY License: A Creative Commons license that permits others to distribute, remix, adapt, and build upon the licensed work, even for commercial purposes, as long as attribution is given to the original creator. [![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)' ;
      } else if (answers.selected_license === 'MIT') {
        var license_Type = 'A permissive open-source license that allows users to reuse and modify the code for any purpose, including in proprietary software, as long as the original license and copyright notice are included. [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
      } 

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
${answers.install_instruct}

## Usage
${answers.usage}


## License

${license_Type}


## Contributing

Contributions are welcome! Please follow the guidelines.

${answers.contributing}

## License

This project is licensed under the ${answers.license}
License.

##Tests

${answers.tests}


[Visit my website](https://www.${answers.github_username}
.com "My Website")

## Contact me with any questions via email 

${answers.email}

  `;
      writeREADME(readmeContent, answers);
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