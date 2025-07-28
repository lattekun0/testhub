import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/ui/Layout'
import DashboardPage from '@/pages/DashboardPage'
import TestCasesPage from '@/pages/TestCasesPage'
import TestPlansPage from '@/pages/TestPlansPage'
import TestRunsPage from '@/pages/TestRunsPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'test-cases', element: <TestCasesPage /> },
      { path: 'test-plans', element: <TestPlansPage /> },
      { path: 'test-runs', element: <TestRunsPage /> },
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
