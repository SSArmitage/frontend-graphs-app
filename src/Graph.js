import React, { Component } from 'react';
// import { Chart } from 'react-charts';
// import * as CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJSReact = require('./canvasjs.react');
// const CanvasJS = CanvasJSReact.CanvasJS;
// const CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import CanvasJSChart from './canvasjs.react'

class Graph extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            options: {
                theme: 'dark1',
                
                title: {
                    text: "Basic Column Chart in React"
                },
                data: [{
                    type: "column",
                    dataPoints: [
                        { label: 'hat', y: 10 },
                        { label: "Orange", y: 15 },
                        { label: "Banana", y: 25 },
                        { label: "Mango", y: 30 },
                        { label: "Grape", y: 28 }
                    ]
                }]
            } 
        }
        // this.myRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        console.log(this.props.data);
        // put data in right format
        const formattedData = {
            theme: 'dark1',
            title: {
                text: "Basic Column Chart in React"
            },
            data: [{
                type: "column",
                dataPoints: []
            },
            {
                type: "column",
                dataPoints: []  
            }],
            axisX: {
                title: "Axis X title",
                interval: 1,
                labelAngle: 45,
                labelFontSize: 0
            },
            axisY: {
                title: "Axis Y title",
                gridThickness: 0
            }
            // width: 0

        };
        
        
        if(prevProps.chosenGraph !== this.props.chosenGraph) {
            console.log(this.props.chosenGraph);
            if (this.props.chosenGraph === 'box1') {
                console.log(`I chose box1!`);
                // choose the data for box1l
                console.log(this.props.data.carMakeAge);
                
                
                // this.props.data.carMakeAge.forEach((item, i) => {
                //     formattedData.data[0].dataPoints[i] = { label: item, y: 10 }
                // })     
                //     formattedData.data[0].dataPoints[i] = { label: car, y: car.averageAge }
                //     i++
                // }
                // console.log(carMakeAgeArray);

                const carMakeAgeArray = Object.entries(this.props.data.carMakeAge)
                console.log(carMakeAgeArray);
                carMakeAgeArray.forEach((item, i) => {
                    formattedData.data[0].dataPoints[i] = { label: item[0] , y: item[1].averageAge }
                })

                formattedData.title.text = 'Car Make vs. Average Age'
                formattedData.axisX.title = 'Car Make'
                formattedData.axisY.title = 'Average Age (years)'
                // formattedData.width = carMakeAgeArray.length
                
                // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
                this.setState({
                    options: formattedData
                })

            } else if (this.props.chosenGraph === 'box2') {
                console.log(`I chose box2`);

                // convert object into an array so that it can iterated over using foreach method to generate all the data points for the graph
                const carMakeAgeArray = Object.entries(this.props.data.carMakeAge)
                console.log(carMakeAgeArray);
                carMakeAgeArray.forEach((item, i) => {
                    formattedData.data[0].dataPoints[i] = { label: item[0], y: item[1].numMale }
                })

                carMakeAgeArray.forEach((item, i) => {
                    formattedData.data[1].dataPoints[i] = { label: item[0], y: item[1].numFemale }
                })

                formattedData.title.text = 'Car Make vs. Gender'
                formattedData.axisX.title = 'Car Make'
                formattedData.axisY.title = 'Number of People'
                formattedData.data[0].showInLegend = true
                formattedData.data[1].showInLegend = true
                formattedData.data[0].legendText = 'Male'
                formattedData.data[1].legendText = 'Female'
                formattedData.data[0].type = 'line'
                formattedData.data[1].type = 'line'
                // formattedData.width = carMakeAgeArray.length
                console.log(formattedData);
                

                // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
                this.setState({
                    options: formattedData
                })


            } else if (this.props.chosenGraph === 'box3') {
                console.log(`I chose box3`);

                // convert object into an array so that it can iterated over using foreach method to generate all the data points for the graph
                const countryVsCompanyArray = Object.entries(this.props.data.countryVsCompany)
                console.log(countryVsCompanyArray);
                countryVsCompanyArray.forEach((item, i) => {
                    formattedData.data[0].dataPoints[i] = { label: item[0], y: item[1].numOfCompanies }
                })

                formattedData.title.text = 'Country vs. Number of Companies'
                formattedData.axisX.title = 'Country'
                formattedData.axisY.title = 'Number of Companies'
                // formattedData.width = carMakeAgeArray.length

                // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
                this.setState({
                    options: formattedData
                })
            }
            
            
        }
        
    }

    // refer = (ref) => {
    // this.chart = ref
    // }
    

    render() {
        // console.log(this.props.data);
        const data = this.props.data;

        // const options = {
        //     title: {
        //         text: "Basic Column Chart in React"
        //     },
        //     data: [{
        //         type: "column",
        //         dataPoints: [
        //             { label: 'hat', y: 10 },
        //             { label: "Orange", y: 15 },
        //             { label: "Banana", y: 25 },
        //             { label: "Mango", y: 30 },
        //             { label: "Grape", y: 28 }
        //         ]
        //     }]
        // }
        return(
              
            <div className="graphContainer">
                <CanvasJSChart 
                options={this.state.options}
                onRef={ref => this.chart = ref}
                />
            </div>
        );
        
    }
}

export default Graph;