import React from "react";
import { useSelector } from "react-redux";

function DestinationFact() {
    const selectedDestination = useSelector(
        (state) => state.destinationStore.destinationSelected
    );
    if (selectedDestination == undefined) {
        return (
            <div className="text-center pt-4 text-warning">Select a Destination</div>
        );
    } else {
        return (
            <div className="text-center border p-3 m-3">
                <h4 className="text-success">{selectedDestination.name}</h4>
                <span style={{color:"white"}}>   Days Recommened : {selectedDestination.days}</span> <br />
                <span style={{ color: "white" }}>     Fun Fact : {selectedDestination.fact}</span> <br />
            </div>
        );
    }
}

export default DestinationFact;
