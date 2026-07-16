import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Analytics from '../pages/Analytics';
import Dashboard from '../pages/Dashboard';
import LeadsPage from '../pages/leads/LeadsPage';
import Settings from '../pages/Settings';
import DashboardLayout from '../layouts/DashboardLayout';
import CreateLead from '@/pages/leads/CreateLead';
import LeadsDetails from '@/pages/leads/LeadsDetails';
import ClientsPage from '@/pages/clients/ClientsPage';
import ClientDetails from '@/pages/clients/ClientDetails';
import CreateClient from '@/pages/clients/CreateClient';
import ProjectPage from '@/pages/projects/ProjectPage';
import CreateProject from '@/pages/projects/CreateProject';
import ProjectDetails from '@/pages/projects/ProjectDetails';
import TasksFromProject from '@/pages/tasks/TaskFromProject';
import TasksPage from '@/pages/tasks/TasksPage';
import TaskDetailsPage from '@/pages/tasks/TaskDetailsPage';
import TaskProgress from '@/pages/tasks/TaskProgress';
import PublicRoute from './PublicRoute';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/leads/:id" element={<LeadsDetails />} />
                <Route path="/leads/create" element={<CreateLead />} />
                <Route path="/leads/edit/:id" element={<CreateLead isEdit={true} />} />

                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/:id" element={<ClientDetails />} />
                <Route path="/clients/create" element={<CreateClient />} />
                <Route path="/clients/edit/:id" element={<CreateClient isEdit={true} />} />


                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/projects/create" element={<CreateProject />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/projects/edit/:id" element={<CreateProject isEdit={true} />} />


                <Route path="/tasks" element={<TasksFromProject />} />
                <Route path="/tasks/select/:id" element={<TasksPage />} />
                <Route path="/tasks/details/:id" element={<TaskDetailsPage />} />
                <Route path="/tasks/update/:id" element={<TaskProgress />} />

                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>    
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}

export default AppRoutes;