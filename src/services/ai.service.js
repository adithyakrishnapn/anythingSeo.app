import * as API from '../api/api.js';

/**
 * Client AI Agent APIs
 */

// Analyze client health, risk score, opportunities, risks, recommended actions
export const analyzeClient = async (clientId) => {
    const response = await API.POST(`/ai/clients/${clientId}/analyze`);
    return response;
};

// Generate meeting preparation summary and discussion points
export const generateMeetingSummary = async (clientId) => {
    const response = await API.POST(`/ai/clients/${clientId}/meeting-summary`);
    return response;
};

/**
 * Task AI Agent APIs
 */

// Analyze a specific task's priority and next steps
export const analyzeTask = async (taskId) => {
    const response = await API.POST(`/ai/tasks/${taskId}/analyze`);
    return response;
};

// Bulk prioritize all pending tasks
export const prioritizeTasks = async () => {
    const response = await API.POST('/ai/tasks/prioritize');
    return response;
};

// Retrieve daily task workload summary and operational health
export const getDailyTaskSummary = async () => {
    const response = await API.POST('/ai/tasks/daily-summary');
    return response;
};
