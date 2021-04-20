#!/usr/bin/env node

const { getCode, getName } = require('country-list');
const axios = require('axios').default;
// const chalk = require ('chalk');

//-----------ORA Chargement------------------------
const ora = require('ora');
const oraSpinner = ora('Loading');

//-------------------------------------------------


let year;
let country;
let countryCode;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Country ? ", function(country){

    countryCode = getCode(`${country}`);

    rl.question("Year ? ", function (year){
        

        if(!year){
            year = new Date().getFullYear();
        }

        if (countryCode){

            axios
                .get(
                    `https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`
                    )
                .then(function (response) {

                    oraSpinner.succeed();

                    let data = response.data;

                    data.forEach(holiday =>{
                        console.log(`${holiday.date} - ${holiday.name} - ${holiday.localName}`)
                    });

                })
                .catch(function (error){

                    oraSpinner.fail();

                    console.log(error);
                });
        }

        rl.close();
    });
});