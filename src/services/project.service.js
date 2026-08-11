import * as API from '../api/api.js';

export const createProject = async (projectData) => {
    return await API.POST('/api/projects/create-project', projectData);
}

export const getProjects = async () => {
    return await API.GET('/api/projects/get-projects');
}

export const getProjectById = async (id) => {
    return await API.GET(`/api/projects/get-project/${id}`);
}

export const updateProject = async (id, projectData) => {
    return await API.PUT(`/api/projects/update-project/${id}`, projectData);
}

export const deleteProject = async (id) => {
    return await API.DELETE(`/api/projects/delete-project/${id}`);
}

export const getProjectsByClientId = async (clientId) => {
    return await API.GET(`/api/projects/get-projects-by-client/${clientId}`);
}

export const convertToComplete = async (id) => {
    return await API.PUT(`/api/projects/change-status/${id}`);
}
