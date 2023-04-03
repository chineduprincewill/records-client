import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call

// define a generatePDF function that accepts a tickets argument
const generatePDF = (data, columns) => {
  // initialize jsPDF
    const doc = new jsPDF();

    const replaceAllBackslashes = (string, replacement) => {
        // eslint-disable-next-line
        return string.replaceAll('\"', replacement);
    }

    const newcolumns = [];
    const displaycolumns = [];
    const tableRows = [];

    if(data !== null && data !== undefined){   

        columns.forEach(clm => {
            newcolumns.push((clm.field));
            displaycolumns.push((clm.field).replace('_', ' '));
        })

        data.forEach(dtrow => {
            const dtData = Object.entries(dtrow);

            const displayData = [];
            dtData.forEach(dtParam => {
                if(newcolumns.includes(dtParam[0])){
                    if(dtParam[0] === 'asset'){
                        displayData.push(replaceAllBackslashes(dtParam[1], ' '))
                    }
                    else{
                        displayData.push(dtParam[1])
                    }
                }
            })

            tableRows.push(displayData);
        })
    }

    const tableColumns = displaycolumns;

    // startY is basically margin-top
    doc.autoTable(tableColumns, tableRows, { startY: 20 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    //doc.text("Closed tickets within the last one month.", 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;