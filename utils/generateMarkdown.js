// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

//----------
//reusable funtion to identify the section and assign the correct input
function sectionSelector(topic, data) {
  switch (topic) {
    case 'Description':
      return data.description;
    case 'Table of Contents':
      // converts Table of contents to list and adds page references.
      let text = [];
      for (let content of data.tableofcontents.slice('1')) {
        text.push(`* [${content}](#${content.toLowerCase()})`);
      }
      return text.join(' \n')
    case 'Installation':
      return data.installation;
    case 'Usage':
      return data.usage;
    case 'License':
      return data.license;
    case 'Contributing':
      return data.contributions;
    case 'Tests':
      return data.tests;
    case 'Questions':
      let contact = [data.username, data.email]
      return `[Github Profile](https://github.com/${contact[0]}/)
      \n[Email: ${contact[1]}](mailto:${contact[1]})`;
      default:
        return `<!--- No Information added --->`;
  }
}

//Function to create ReadME file and populate with user input.
function generateMarkdown(data) {
let file2 = [`# ${data.title} \n\n`];
for (let topic of data.tableofcontents) {
  file2.push(`## ${topic} \n
  ${sectionSelector(topic, data)} \n\n`)
}
return file2.join('');
}

module.exports = generateMarkdown;
