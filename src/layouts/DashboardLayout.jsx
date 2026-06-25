import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'

function DashboardLayout() {

    const [collapsed, setCollapsed] =
        useState(() => {
            return localStorage.getItem('sidebar-collapsed') === 'true';
        });

    return (
        <div className='flex h-screen'>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className='flex min-w-0 flex-1 flex-col'>
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
                <main className='min-w-0 flex-1 p-6 overflow-y-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout