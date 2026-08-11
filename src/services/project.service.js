import * as API from '../api/api.js';

export const createProject = async (projectData) => {
    return await API.POST('/projects/create-project', projectData);
}

export const getProjects = async () => {
    return await API.GET('/projects/get-projects');
}

export const getProjectById = async (id) => {
    return await API.GET(`/projects/get-project/${id}`);
}

export const updateProject = async (id, projectData) => {
    return await API.PUT(`/projects/update-project/${id}`, projectData);
}

export const deleteProject = async (id) => {
    return await API.DELETE(`/projects/delete-project/${id}`);
}

export const getProjectsByClientId = async (clientId) => {
    return await API.GET(`/projects/get-projects-by-client/${clientId}`);
}

export const convertToComplete = async (id) => {
    return await API.PUT(`/projects/change-status/${id}`);
}
