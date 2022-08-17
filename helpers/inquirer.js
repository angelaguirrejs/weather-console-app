const inquirer = require('inquirer');
require('colors');

async function menu() {

    const questions = [
        {
            type: 'list',
            name: 'answer',
            message: 'What do you whish to do?',
            choices: [
                {
                    value: 1, 
                    name: `${'1.'.green} Find city`
                },
                {
                    value: 2,
                    name: `${'2.'.green} History`
                },
                {
                    value: 0,
                    name: `${'0.'.green} Exit`
                }
            ]
        }
    ]

    console.clear();
    const { answer } = await inquirer.prompt(questions);
    return answer;

}

async function placesMenu(places) {

    const choices = places.map((place, index )=> {

        const idx = `${index + 1}.`.green;

        return {
            value: place.id,
            name: `${idx} ${place.name}`,
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Exit'
    });

    const questions = [
        {
            type: 'list',
            name: 'place',
            message: 'What place are you looking for?',
            choices,
        }
    ];

    console.clear();
    const { place } = await inquirer.prompt(questions);
    return place;

}

async function pause() {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`

        }
    ]

    console.log('\n');
    await inquirer.prompt(question);
}

async function readInput(message) {
    const question = [
        {
            type: 'input',
            name: 'text',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Type a right value';
                }
                return true;
            }
        }
    ];

    const { text } = await inquirer.prompt(question);
    return text;
}

module.exports = {
    menu,
    readInput,
    pause,
    placesMenu
}