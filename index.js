require('dotenv').config();

const { readInput, menu, pause, placesMenu} = require("./helpers/inquirer");
const { SearchService } = require("./services/search");

async function main() {

    let option;

    const service = new SearchService();

    do {

        option = await menu();

        switch (option) {
            case 1:
                const place = await readInput('Type the city: ');
                const cities = await service.find(place);
                const selectedId = await placesMenu(cities);
                const choosenCity = cities.find(c => c.id == selectedId);

                const weather = await service.findWeather(choosenCity.lng, choosenCity.lat);

                console.log('\nInformation about the city\n\n'.green);
                console.log('City:', choosenCity.name);
                console.log('Lat:', choosenCity.lat);
                console.log('Lng:', choosenCity.lng);
                console.log('Temperature:', weather.temp);
                console.log('Description:', weather.desc);
                console.log('Maximum temperature:', weather.max);
                console.log('Minimum temperature:', weather.min);
                break;

            case 2:
                break;
        }

        await pause();

    } while(option != 0)

}

main();