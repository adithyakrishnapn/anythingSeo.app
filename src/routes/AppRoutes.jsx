import { Route, Routes } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import AuthRoutes from './AuthRoutes';
import StaticRoutes from './StaticRoutes';
import NotFound from './NotFound';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<StaticRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;