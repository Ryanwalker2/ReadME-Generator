// TODO: Include packages needed for this application
const generateMarkdown = require('./utils/generateMarkdown');
const inquirer = require('inquirer');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
const fs = require('fs');

const licenses = ['AFL-3.0', 'Apache-2.0', 'Artistic-2.0', 'BSL-1.0', 'BSD-2-Clause', 'BSD-3-Clause', 'BSD-3-Clause-Clear', 'BSD-Clause', '0BSD', 'CC', 'CC0-1.0', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'WTFPL', 'ECL-2.0', 'EPL-1.0', 'EPL-2.0', 'EUPL-1.1', 'AGPL-3.0', 'GPL', 'GPL-2.0', 'GPL-3.0', 'LGPL', 'LGPL-2.1', 'LGPL-3.0', 'ISC', 'LPPL-1.3c', 'MS-PL', 'MIT', 'MPL-2.0', 'OSL-3.0', 'PostgreSQL', 'OFL-1.1', 'NCSA', 'Unlicense', 'Zlib', new inquirer.Separator()];
// TODO: Create an array of questions for user input
const questions = [{
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
}, {
    type: 'checkbox',
    name: 'tableofcontents',
    message: 'Please select the sections you would like to include in your ReadMe.',
    choices: [
        { name: 'Table of Contents', checked: true },
        { name: 'Description', checked: true },
        { name: 'Installation', checked: true },
        { name: 'Usage', checked: true },
        { name: 'License', checked: true },
        { name: 'Contributing' },
        { name: 'Tests' },
        { name: 'Questions' },
        new inquirer.Separator()
    ],
}, {
    type: 'input',
    name: 'description',
    message: 'Please enter a description for your project.',
    when(answers) {
        return answers.tableofcontents.includes('Description');
    }
}, {
    type: 'input',
    name: 'installation',
    message: 'Add instructions on how to install the project.',
    when(answers) {
        return answers.tableofcontents.includes('Installation');
    }
}, {
    type: 'input',
    name: 'usage',
    message: 'Describe how to use your application.',
    when(answers) {
        return answers.tableofcontents.includes('Usage');
    }
}, {
    type: 'list',
    name: 'license',
    message: 'What kind of license will you be using?',
    choices: licenses,
    when(answers) {
        return answers.tableofcontents.includes('License');
    }
}, {
    type: 'input',
    name: 'contributions',
    message: 'Provide instructions on how you would like others to contribute to the project.',
    when(answers) {
        return answers.tableofcontents.includes('Contributing');
    }
}, {
    type: 'input',
    name: 'tests',
    message: 'List any Tests included with the package.',
    when(answers) {
        return answers.tableofcontents.includes('Tests');
    }
}, {
    type: 'input',
    name: 'username',
    message: 'What is your Github Username?',
    when(answers) {
        return answers.tableofcontents.includes('Questions');
    }
}, {
    type: 'input',
    name: 'email',
    message: 'What email address would you like user/contributors to contact you at if they have any additional questions?',
    when(answers) {
        return answers.tableofcontents.includes('Questions');
    }
}, {
    type: 'input',
    name: 'filename',
    message: 'What should the file be named? You do not need to include the file extension.',
    default: 'README'
}, {
    type: 'directory',
    name: 'filepath',
    message: 'Choose where you would like the markdown file saved',
    basePath: './',
    options: {
        displayFiles: false,
    }
}];

// TODO: Create a function to write README file
function writeToFile(data) {
    const fileName = `${data.filename}.md`;
    fs.writeFile(`${data.filepath}/${fileName}`, generateMarkdown(data), (err) => err ? console.log(err) : console.log(`${fileName} successfully created at ${data.filepath}!`));
};

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers);
            writeToFile(answers);
        })
};
// Function call to initialize app
init();
