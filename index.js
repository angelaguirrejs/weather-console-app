const { readInput, menu, pause } = require("./helpers/inquirer");
const { SearchService } = require("./services/search");

async function main() {

    let option;

    const service = new SearchService();

    do {

        option = await menu();

        switch (option) {
            case 1:
                const place = await readInput('Type the city: ');
                
                break;
            case 2:
                break;
        }

        await pause();

    } while(option != 0)

}

main();