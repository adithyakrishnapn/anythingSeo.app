import * as API from '../api/api.js';



export const downloadLeadSummaryPDF = async (summaryId) => {
    try {
        const response = await API.GET(`/api/summary/downloadsummarypdf/${summaryId}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `lead_summary_${summaryId}.pdf`;
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(`Error downloading lead summary PDF for summary with id ${summaryId}:`, error);
        throw error;
    }
}


export const downloadLatestAiAnalysisPDF = async () => {
    try {
        const response = await API.GET(`/api/summary/downloadlatestsummarypdf`, { responseType: 'blob' });
        // console.log(response);
        // console.log(response.data);
        console.log(response instanceof Blob);
        // console.log(response.headers["content-type"]);
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `latest_ai_analysis.pdf`;
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(`Error downloading latest AI analysis PDF:`, error);
        throw error;
    }
}