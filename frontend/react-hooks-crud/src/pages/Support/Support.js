import React, { useState, useEffect } from "react";
import CallReport from "../../services/ReportService";
import Header from "../../components/Header/Header";

function support() {

    return (
        <>
            <div className="print report">
                <Header />
                <CallReport></CallReport>
                
            </div>

        </>
    );

};

export default support;
