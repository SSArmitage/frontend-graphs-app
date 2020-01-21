import React, { Component } from 'react';
import CSVReader from 'react-csv-reader'

class FileDownload extends Component {
    constructor() {
        super();
        this.state = {
            variableNames: [],
            data : [],
            checkboxSelected: []
        }
    }

    handleFileLoad = (data) => {
        // remove the first item in the array and assign it to variableNames
        // now "data" is just an array of the people
        const variableNames = data.shift();

        this.setState({
            variableNames: variableNames
        })

        // INDICES
        // find the index of the item "company"
        const companyIndex = variableNames.indexOf('Company Name');
        // find indec of country
        const countryIndex = variableNames.indexOf('Country');
        // find the index of gender
        const genderIndex = variableNames.indexOf('Gender');
        // find the index of car make
        const carMakeIndex = variableNames.indexOf('Car Make');
        // find the index of car color
        const carColorIndex = variableNames.indexOf('Car Color');
        // find the index of age
        const ageIndex = variableNames.indexOf('Age');
        // find the index of company domain (going to need regx)
        const companyNameIndex = variableNames.indexOf('Company Name');
        // find the index of ip address
        const ipAddressIndex = variableNames.indexOf('ip_address');
        // find the index of address
        const addressIndex = variableNames.indexOf('Street address');

        // COMPARING DATA
        // num of companies per country
        // --> x-axis=num of companies, y-axis=country
        // distance to work (person address + company address) -> mapquest api
        // number of cars per color
        // --> each line is a color, x-axis=car make, y-axis=num of cars 
        // gender vs car 
        // --> 2 lines, x-axis=car make, y-axis=num of people
        // age vs car (avg ages for each car)
        // --> need to get the toal num of each gender for each car make
        // --> x-axis=car make, y-axis=avg age
        // --> need to get the ages for each car make and then get the avg

        // Collecting and manipulating data to add to the allDaya object (will be set in state and sent to App.js)
        let companyNames = [];
        let countryNames = [];
        let carMakeNames = [];
        let carColors = [];
        let age = [];
        const allData = {};
        const carMakeAge = {}
        // what the object will look like after adding key/values
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
         // what the object will look like after adding key/values
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
            // COMPANY VS COUNTRY
            if (!countryVsCompany[`${personsCountry}`] && personsCountry !== undefined) {
                countryVsCompany[`${personsCountry}`] = {
                    numOfCompanies: 1
                }
            } else if (countryVsCompany[`${personsCountry}`] && personsCountry !== undefined) {
                countryVsCompany[`${personsCountry}`].numOfCompanies++
            }

            // MAKE OF CAR VS AGE
            // for each person grab their age and the car make they have
            let personsCar = person[carMakeIndex]
            
            if (!carMakeAge[`${personsCar}`] && personsCar !== undefined) {
                carMakeAge[`${personsCar}`] = {
                    numOfCars: 1,
                    age: [parseInt(person[ageIndex])],
                    averageAge: 0,
                    gender: [person[genderIndex]]
                }

            } else if (carMakeAge[`${personsCar}`] && personsCar !== undefined){
                carMakeAge[`${personsCar}`].numOfCars++
                carMakeAge[`${personsCar}`].age.push(parseInt(person[ageIndex]))
                carMakeAge[`${personsCar}`].gender.push(person[genderIndex])
            }
        });        

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

        // get all the data associated with the file and save it in state
        this.setState({
            data: allData
        })
        
        // send the data up to app.js (will be sent down to the graph component)
        this.props.uploadFile(allData)  
    }   

    handleSubmit = (event) => {
        event.preventDefault();
        
        // grab all of the checkboxes (convert from HTMLCollection to an array using spread operator)
        let checkBoxes = [...document.getElementsByClassName('checkbox')];
        // filter out the checkboxes that were checked
        const checkboxValues = []
        checkBoxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkboxValues.push(checkbox.value);
            } 
        })
        
        // check to make sure only 2 checkboxes are selcted:
        // if user picked more than 2 variables
        if (checkboxValues.length > 1) {
            alert('You can only pick 1 comparison as a time. Please pick again!')
            // reset all the checkboxes
            checkBoxes.forEach((checkbox) => {
                checkbox.checked = false;
            })
        } else if (checkboxValues.length === 0) {
            alert('You need to pick 1 comparison')
            // reset all the checkboxes
            checkBoxes.forEach((checkbox) => {
                checkbox.checked = false;
            })
        } else {
            // reset all the checkboxes
            checkBoxes.forEach((checkbox) => {
                checkbox.checked = false;
            })

            // check which box the user selected
            if (checkboxValues[0] === 'box1') {
                // need to grab the car make and age data
                this.props.selectedGraph('box1')
                // send the data up to app.js (will be sent down to the graph component)
            } else if (checkboxValues[0] === 'box2') {
                // need to grab the car make and gender data
                this.props.selectedGraph('box2')
            } else if (checkboxValues[0] === 'box3') {
                // need to grab the companies and countries data
                this.props.selectedGraph('box3')
            }
        }        
    }

    render() {
        return(
            
            <div className="fileContainer">
                <div className="csvReader">
                    <h2>Upload CSV File:</h2>
                    <CSVReader onFileLoaded={this.handleFileLoad} />
                </div>
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
                <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default FileDownload;