import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = (props) => {

    const [record, setRecord] = useState(null);
    //const [donationsCount, setDonationsCount] = useState(0);
    //const [totalPledge, setTotalPledge] = useState(0);
    //const [totalPaid, setTotalPaid] = useState(0);
    //const closedrop = false;

    const refreshRecord = (val) => {
        setRecord(val);
    }

    /*const updateCount = (val) => {
        setDonationsCount(val);
    }

    const updatePledge = (val) => {
        setTotalPledge(val);
    }

    const updatePaid = (val) => {
        setTotalPaid(val);
    }*/

    useEffect(() => {
        
        refreshRecord();
    }, [record])

    /*useEffect(() => {
        updateCount()
    }, [donationsCount])

    useEffect(() => {
        updatePledge();
    }, [totalPledge])

    useEffect(() => {
        updatePaid();
    }, [totalPaid])*/

    return(
        <DataContext.Provider value={{refreshRecord, record, /*updateCount, donationsCount, updatePledge, totalPledge, updatePaid, totalPaid*/}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;