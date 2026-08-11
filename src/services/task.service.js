import * as API from '../api/api.js';

export const createTask = async (taskData) => {
    return await API.POST('/api/tasks', taskData);
};

export const getAllTasks = async () => {
    return await API.GET('/api/tasks');
};

export const getTaskById = async (id) => {
    return await API.GET(`/api/tasks/${id}`);
};

export const updateTask = async (id, taskData) => {
    return await API.PUT(`/api/tasks/${id}`, taskData);
};

export const deleteTask = async (id) => {
    return await API.DELETE(`/api/tasks/${id}`);
};

export const updateTaskStatus = async (id, status) => {
    return await API.PATCH(`/api/tasks/${id}/status`, { status });
};

export const addNote = async (id, note) => {
    return await API.POST(`/api/tasks/${id}/notes`, { note });
};

export const removeNote = async (id, noteIndex) => {
    return await API.DELETE(`/api/tasks/${id}/notes/${noteIndex}`);
};

export const addComment = async (id, comment) => {
    return await API.POST(`/api/tasks/${id}/comments`, comment);
};

export const addAttachment = async (id, attachment) => {
    return await API.POST(`/api/tasks/${id}/attachments`, attachment);
};

export const removeAttachment = async (id, attachmentId) => {
    return await API.DELETE(`/api/tasks/${id}/attachments/${attachmentId}`);
};

export const sendTaskFollowUp = async (id) => {
    return await API.POST(`/api/tasks/${id}/followup`);
};
