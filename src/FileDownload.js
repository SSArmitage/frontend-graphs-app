import React, { Component } from 'react';
// import csvParser from 'csv-parser'
import CSVReader from 'react-csv-reader'

class FileDownload extends Component {
    constructor() {
        super();
        this.state = {
            variableNames: [],
            data : [],
            checkboxSelected: [],
            carMakeAge: {}
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target.value);

        // get the first file in the node's file list as a File object
        const csvFile = document.getElementById('fileItem').files[0];
        console.log(csvFile);

        // var csv = require('csv-parser');
        // var fs = require('fs');
        // const results = [];

        // fs.createReadStream(csvFile)
        //     .pipe(csv())
        //     .on('data', (data) => results.push(data))
        //     .on('end', () => {
        //         console.log(results);
        //         // [
        //         //   { NAME: 'Daffy Duck', AGE: '24' },
        //         //   { NAME: 'Bugs Bunny', AGE: '22' }
        //         // ]
        //     });
    }

    handleFileLoad = (data) => {
        // console.log(data)
        
        // remove the first item in the array and assign it to variableNames
        // now "data" is just an array of the people
        const variableNames = data.shift();

        
        this.setState({
            variableNames: variableNames
        })

        // find the index of the item "company"
        const companyIndex = variableNames.indexOf('Company Name');
        console.log(companyIndex);
        // find indec of country
        const countryIndex = variableNames.indexOf('Country');
        // find the index of gender
        const genderIndex = variableNames.indexOf('Gender');
        console.log(genderIndex);
        // find the index of car make
        const carMakeIndex = variableNames.indexOf('Car Make');
        console.log(carMakeIndex);
        // find the index of car color
        const carColorIndex = variableNames.indexOf('Car Color');
        console.log(carColorIndex);
        // find the index of age
        const ageIndex = variableNames.indexOf('Age');
        console.log(ageIndex);
        // find the index of company domain
        // going to need regx
        const companyNameIndex = variableNames.indexOf('Company Name');
        console.log(companyNameIndex);
        // find the index of ip address
        const ipAddressIndex = variableNames.indexOf('ip_address');
        console.log(ipAddressIndex);
        // find the index of address
        const addressIndex = variableNames.indexOf('Street address');
        console.log(addressIndex);

        // COMPARING DATA
        // num of companies per country
        // --> x-axis=num of companies, y-axis=country
        // distance to work (person address + company address) -> mapquest api
        // number of cars per color
        // --> each line is a color, x-axis=car make, y-axis=num of cars 
        // gender vs car 
        // --> 2 lines, x-axis=car make, y-axis=num of people
        // age vs car (avg up ages for each car)
        // --> need to get the toal num of each gender for each car make
        // --> x-axis=car make, y-axis=avg age
        // --> need to get the ages for each car make and then get the avg

        // get all the company names add to allDaya object
        let companyNames = [];
        let countryNames = [];
        let carMakeNames = [];
        let carColors = [];
        let age = [];
        const allData = {};
        const carMakeAge = {}
        // carMakeAge = {
        //     carMake: {
        //         numOfCars: 0,
        //         age: [],
        //         averageAge: 0,
        //         gender: []
        //         numFemale: 0,
        //         numMale: 0
        // }
        const countryVsCompany = {}
        // countryVsCompany = {
        //       country: {
        //          numOfCompanies: 0
        //      }
        // }

        


        data.forEach((person) => {
            companyNames.push(person[companyIndex]);
            if (!countryNames.includes(person[countryIndex])) {
                countryNames.push(person[countryIndex]);
            } 
            if (!carMakeNames.includes(person[carMakeIndex]) && person[carMakeIndex] !== undefined) {
                carMakeNames.push(person[carMakeIndex]);
            }
            if (!carColors.includes(person[carColorIndex])) {
                carColors.push(person[carColorIndex]);
            } 

            const personsCountry = person[countryIndex]
            console.log(personsCountry);

            // CAR MAKE VS GENDER
            // if () {

            // }
             
            // COMPANY VS COUNTRY
            if (!countryVsCompany[`${personsCountry}`] && personsCountry !== undefined) {
                console.log(`This company wasnt in the array`);
                countryVsCompany[`${personsCountry}`] = {
                    numOfCompanies: 1
                }
            } else if (countryVsCompany[`${personsCountry}`] && personsCountry !== undefined) {
                console.log(`This company was in the array`);
                countryVsCompany[`${personsCountry}`].numOfCompanies++
            }

            // MAKE OF CAR VS AGE
            // for each person grab their age and the car make they have
            let personsCar = person[carMakeIndex]
            console.log(personsCar);
            
            if (!carMakeAge[`${personsCar}`] && personsCar !== undefined) {
                // console.log("Does not exist");
                carMakeAge[`${personsCar}`] = {
                    numOfCars: 1,
                    age: [parseInt(person[ageIndex])],
                    averageAge: 0,
                    gender: [person[genderIndex]]
                }

            } else if (carMakeAge[`${personsCar}`] && personsCar !== undefined){
                // console.log("Does exist");
                carMakeAge[`${personsCar}`].numOfCars++
                carMakeAge[`${personsCar}`].age.push(parseInt(person[ageIndex]))
                carMakeAge[`${personsCar}`].gender.push(person[genderIndex])
            }
        });

        console.log(countryVsCompany);
        

        // get the average age for each car make
        for (const car in carMakeAge) {
            carMakeAge[`${car}`].averageAge = Math.round(carMakeAge[`${car}`].age.reduce((a, b) => a + b, 0) / carMakeAge[`${car}`].numOfCars)
        }

        // get the number of names and females for each car make
        for (const car in carMakeAge) {
            // initialize genders at 0
            carMakeAge[`${car}`].numMale = 0
            carMakeAge[`${car}`].numFemale = 0
            // go through each gender string in the array
            carMakeAge[`${car}`].gender.forEach((gender) => {
                // if the gender string is 'Male'
                if (gender === 'Male') {
                    // if the carMakeAge object does not contain a value for numMale, set it equal to 1
                    if (!carMakeAge[`${car}`].numMale) {
                        carMakeAge[`${car}`].numMale = 1
                    // if the carMakeAge object does contain a value for numMale, increment the count by 1
                    } else {
                        carMakeAge[`${car}`].numMale++
                    } 
                // if the gender string is 'Female' 
                } else {
                    // if the carMakeAge object does not contain a value for numFemale, set it equal to 1
                    if (!carMakeAge[`${car}`].numFemale) {
                        carMakeAge[`${car}`].numFemale = 1
                    // if the carMakeAge object does contain a value for numFemale, increment the count by 1
                    } else {
                        carMakeAge[`${car}`].numFemale++
                    }
                }
            })
        }


        
        // SAVE ALL THE DATA INTO THE OBJECT ALLDATA
        allData.companyNames = companyNames;
        allData.countryNames = countryNames;
        allData.carMakeNames = carMakeNames;
        allData.carColors = carColors;
        allData.carMakeAge = carMakeAge;
        allData.countryVsCompany = countryVsCompany;
        // console.log(allData);
        

        // get all the data associated with the file and save it in state
        this.setState({
            data: allData
        })
        
        

        // const peopleInEachCompany = {};
        // // get the number of companies in each country
        // companyNames.forEach((company) => {
        //     // go through all the people and 

        //     // get the index of the current company
        //     const currentCompanyIndex = companyNames.indexOf(company);
        //     // console.log(currentCompanyIndex);

        // })
        
        // send the data up to app.js (will be sent down to the graph component)
        this.props.uploadFile(allData)  
    }   

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        
        // grab all of the checkboxes (convert from HTMLCollection to an array using spread operator)
        let checkBoxes = [...document.getElementsByClassName('checkbox')];
        console.log(checkBoxes);
        // filter out the checkboxes that were checked
        const checkboxValues = []
        checkBoxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkboxValues.push(checkbox.value);
            } 
        })
        console.log(checkboxValues);
        

        // check to make sure only 2 checkboxes are selcted:
        // if user picked more than 2 variables
        if (checkboxValues.length > 1) {
            console.log('I was longer than 1');
            alert('You can only pick 1 comparison as a time. Please pick again!')
            // reset all the checkboxes
            // document.getElementsByClassName('checkbox').checked = false;
            checkBoxes.forEach((checkbox) => {
                checkbox.checked = false;
            })
        } else if (checkboxValues.length === 0) {
            alert('You need to pick 1 comparison')
            // reset all the checkboxes
            // document.getElementsByClassName('checkbox').checked = false;
            checkBoxes.forEach((checkbox) => {
                checkbox.checked = false;
            })
        } else {
            // set the chosen graph in state
            // this.setState({
            //     checkboxSelected: checkboxValues
            // })
            // reset all the checkboxes
            // document.getElementsByClassName('checkbox').checked = false;
            checkBoxes.forEach((checkbox) => {
                checkbox.checked = false;
            })

            // check which box the user selected
            if (checkboxValues[0] === 'box1') {
                console.log('I picked box1');
                // need to grab the car make and age data
                this.props.selectedGraph('box1')
                // send the data up to app.js (will be sent down to the graph component)
                // this.props.uploadFile(allData)
            } else if (checkboxValues[0] === 'box2') {
                console.log('I picked box2')
                // need to grab the car make and gender data
                this.props.selectedGraph('box2')
            } else if (checkboxValues[0] === 'box3') {
                // need to grab the companies and countries data
                this.props.selectedGraph('box3')
                console.log('I picked box3')
            }
        }

        // // if user picked only 1 variable
        // } else if (checkboxValues.length < 2) {
        //     alert('You need to pick 2 variables. Please pick again!')
        //     // reset all the checkboxes
        //     // document.getElementsByClassName('checkbox').checked = false;
        //     checkBoxes.forEach((checkbox) => {
        //         checkbox.checked = false;
        //     })
        // // if user picked  2 variables
        // } else {
        //     console.log(`I was less than 2`);
        //     console.log(checkboxValues);
        //     this.setState({
        //         checkboxesSelected: checkboxValues
        //     })
        //     // reset all the checkboxes
        //     // document.getElementsByClassName('checkbox').checked = false;
        //     checkBoxes.forEach((checkbox) => {
        //         checkbox.checked = false;
        //     })
        // }        
    }

    render() {
        return(
            // <form 
            // onSubmit={this.handleSubmit}>
            //     <label 
            //     htmlFor="fileItem"
            //     className="visuallyHidden"
            //     >Upload CSV File</label>
            //     <input 
            //     type="file" 
            //     id="fileItem" 
            //     accept=".csv"/>
            //     <button>Upload CSV File</button>
            // </form>
            <div className="fileContainer">
                <div className="csvReader">
                    <h2>Upload csv file</h2>
                    <CSVReader onFileLoaded={this.handleFileLoad} />
                </div>
                {/* <label htmlFor="checkbox1">{}</label>
                <input type="checkbox" id="checkbox1"></input> */}
                <form
                method="post" 
                className="variableChoices"
                onSubmit={this.handleSubmit}>
                    <h2>Pick Data to Compare:</h2>

                    <div className="checkboxContainer">
                        <input type="checkbox" id="checkbox1" value="box1" className="checkbox"></input>
                        <label for="checkbox1">Car Make vs. Age</label>
                    </div>

                    <div className="checkboxContainer">
                        <input type="checkbox" id="checkbox2" value="box2" className="checkbox"></input>
                        <label for="checkbox2">Car Make vs. Gender</label>
                    </div>

                    <div className="checkboxContainer">
                        <input type="checkbox" id="checkbox3" value="box3" className="checkbox"></input>
                        <label for="checkbox3">Companies vs. Country</label>
                    </div>
                {
                    // this.state.variableNames.map((variable, i) => {
                    //     return(
                    //         <div>
                    //             <label htmlFor={`checkbox${i}`}>{variable}</label>
                    //             <input 
                    //             type="checkbox" 
                    //             id={`checkbox${i}`}
                    //             className="checkbox"
                    //             value={variable}
                    //             ></input>
                    //         </div>
                    //     )
                    // })  
                }
                <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default FileDownload;