import { createBrowserRouter } from 'react-router-dom'
import TranslationallyLandingPage from './pages/landing/LandingPage'
import { LoginPlaceholder } from './pages/auth/LoginPage'




export const router = createBrowserRouter([
  {
    path: '/',
    element: <TranslationallyLandingPage />,
  },
  {
    path: '/login',
    element: <LoginPlaceholder />,
  },
])