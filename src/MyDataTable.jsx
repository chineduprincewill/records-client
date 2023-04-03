import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
 
class MyDataTable extends Component {
 
    constructor() {
        super();
        this.state = {
            cars: [], //data to be displayed in the table 
            selectedCar: null //selected row in the table 
        };

        this.onCarSelect = this.onCarSelect.bind(this); //binding the onCarSelect method to the class instance 

    }

    componentDidMount() { //fetching data from an API or a local file 

        fetch('https://github.com/vega/vega/blob/main/docs/data/cars.json') //fetching data from an API 
            .then(response => response.json()) //converting response to json format 
            .then(data => this.setState({ cars: data })); //setting the fetched data to the state variable cars  

    }

    onCarSelect(e) { //method for selecting a row in the table 

        this.setState({ selectedCar: e.data }); //setting the selected row to the state variable selectedCar  

    }

    render() {

        let header = <div style={{ textAlign: 'left' }}>My Data Table</div>; //header of the table  

        let footer = <div style={{ textAlign: 'left' }}>My Footer</div>; //footer of the table  

        let carEditor = <p>Selected Car Editor</p>; //editor for editing a selected row in the table  

        return (
            <div className="datatable-demo">                            
                <DataTable 
                    value={this.state.cars} 
                    selectionMode="single" 
                    header={header} 
                    footer={footer} 
                    selection={this.state.selectedCar} 
                    onSelectionChange={e => this.onCarSelect(e)} 
                >                    
                    <Column field="vin" header="Vin" sortable filter filterPlaceholder="Search by Vin" />                    
                    <Column field="year" header="Year" sortable filter filterPlaceholder="Search by Year" />                    
                    <Column field="brand" header="Brand" sortable filter filterPlaceholder="Search by Brand" />                    
                    <Column field="color" header="Color" sortable filter filterPlaceholder="Search by Color"/>                                        												                                        		
                </DataTable>    

                {this.state.selectedCar && carEditor}     
            </div> 
        );     
    }
} 

export default MyDataTable;