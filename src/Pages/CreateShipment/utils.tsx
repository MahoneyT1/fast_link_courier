/**
 * A function that makes the call to read the pdf send from backend
 * and generate a downloadable link to the browser and previews or
 * download the pdf file
 */

import  axios  from 'axios'
import { useState, createContext } from 'react';


export function useDownloadReceipt () {
    const [receipt, setReceipt] = useState<{id: string, url: string} | null>(null);

    const downloadReceipt = async (receiptId: string)=> {

        // make a request to the receipt endpoint
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/receipt/${receiptId}/download/`,
                { withCredentials: true, responseType: 'blob' });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            setReceipt({id: receiptId, url });
        } catch (err){
            console.error('Failed to download receipt', err);
        }
        
    }

    return { downloadReceipt, receipt };
};

