import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/ui/AuthLayout'
import Layout from '@/components/ui/Layout'
import DashboardPage from '@/pages/DashboardPage'
import TestCasesPage from '@/pages/TestCasesPage'
import TestPlansPage from '@/pages/TestPlansPage'
import TestRunsPage from '@/pages/TestRunsPage'
import ProjectSettingsPage from '@/pages/ProjectSettingsPage'
import ProfilePage from '@/pages/ProfilePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),

    children: [
      { index: true, element: <Navigate to="/app/dashboard" /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'test-cases', element: <TestCasesPage /> },
      { path: 'test-plans', element: <TestPlansPage /> },
      { path: 'test-runs', element: <TestRunsPage /> },
      { path: 'settings', element: <ProjectSettingsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
