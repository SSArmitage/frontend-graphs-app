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
            options: {} 
        }
    }

    componentDidMount() {
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
        };

        // DETERMINE WHICH GRAPH TO SHOW (based on which checkbix was clicked)
        if (this.props.chosenGraph === 'box1') {

            const carMakeAgeArray = Object.entries(this.props.data.carMakeAge)
            carMakeAgeArray.forEach((item, i) => {
                formattedData.data[0].dataPoints[i] = { label: item[0], y: item[1].averageAge }
            })

            formattedData.title.text = 'Car Make vs. Average Age'
            formattedData.axisX.title = 'Car Make'
            formattedData.axisY.title = 'Average Age (years)'

            // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
            this.setState({
                options: formattedData
            })
        } else if (this.props.chosenGraph === 'box2') {
            // convert object into an array so that it can iterated over using foreach method to generate all the data points for the graph
            const carMakeAgeArray = Object.entries(this.props.data.carMakeAge)
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

            // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
            this.setState({
                options: formattedData
            })
        } else if (this.props.chosenGraph === 'box3') {
            // convert object into an array so that it can iterated over using foreach method to generate all the data points for the graph
            const countryVsCompanyArray = Object.entries(this.props.data.countryVsCompany)
            countryVsCompanyArray.forEach((item, i) => {
                formattedData.data[0].dataPoints[i] = { label: item[0], y: item[1].numOfCompanies }
            })

            formattedData.title.text = 'Country vs. Number of Companies'
            formattedData.axisX.title = 'Country'
            formattedData.axisY.title = 'Number of Companies'

            // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
            this.setState({
                options: formattedData
            })
        }
    }

    componentDidUpdate(prevProps) {
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
        };
        
        // check to see if the components props updates, if so determine which graph to show based on which checkbox the user clicked
        if(prevProps.chosenGraph !== this.props.chosenGraph) {
            if (this.props.chosenGraph === 'box1') {
                
                const carMakeAgeArray = Object.entries(this.props.data.carMakeAge)
                carMakeAgeArray.forEach((item, i) => {
                    formattedData.data[0].dataPoints[i] = { label: item[0] , y: item[1].averageAge }
                })

                formattedData.title.text = 'Car Make vs. Average Age'
                formattedData.axisX.title = 'Car Make'
                formattedData.axisY.title = 'Average Age (years)'
                
                // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
                this.setState({
                    options: formattedData
                })

            } else if (this.props.chosenGraph === 'box2') {

                // convert object into an array so that it can iterated over using foreach method to generate all the data points for the graph
                const carMakeAgeArray = Object.entries(this.props.data.carMakeAge)
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

                // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
                this.setState({
                    options: formattedData
                })


            } else if (this.props.chosenGraph === 'box3') {

                // convert object into an array so that it can iterated over using foreach method to generate all the data points for the graph
                const countryVsCompanyArray = Object.entries(this.props.data.countryVsCompany)
                countryVsCompanyArray.forEach((item, i) => {
                    formattedData.data[0].dataPoints[i] = { label: item[0], y: item[1].numOfCompanies }
                })

                formattedData.title.text = 'Country vs. Number of Companies'
                formattedData.axisX.title = 'Country'
                formattedData.axisY.title = 'Number of Companies'

                // set the data into the graph options in state -> will cause the graph to re-render with the user seleced comparison data
                this.setState({
                    options: formattedData
                })
            }
        }
        
    }

    render() {
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