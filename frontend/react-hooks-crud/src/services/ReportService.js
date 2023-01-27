import "../pages/Support/Suport.scss";
import React, { useState, useEffect } from "react";
import http from './http-common';

function CallReport() {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [idP, setIdP] = useState("");
    const [history, setHistory] = useState("");

    
    const get = (event) => {
        return http.get('http://localhost:8080/patients/exportReport', { responseType: 'blob', params: { idP: idP, history: history } })
            .then(response => {
                // Crear una URL para el archivo PDF
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setPdfUrl(pdfUrl);
            })
            
            .catch(error => {
                console.error(error);
            });
            
    }

    return (
        <div>
            <label>
                If you want to generate a report, fill in the following information with the patient's id and history:</label>
            <label >
                ID:
                <input type="text" value={idP} onChange={e => setIdP(e.target.value)} />
            </label>
            <label>
                HISTORY:
                <input type="text" value={history} onChange={e => setHistory(e.target.value)} />
            </label>
            <div className="container-button">
                <button  className="button-pdf" onClick={get}>Descargar PDF</button>
                {pdfUrl && <a href={pdfUrl} download>Descargar PDF</a>}
            </div>

        </div>
    );
}
export default CallReport;
