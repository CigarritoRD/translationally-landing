import { createBrowserRouter } from 'react-router-dom'
import TranslationallyLandingPage from './pages/landing/LandingPage'





export const router = createBrowserRouter([
  {
    path: '/',
    element: <TranslationallyLandingPage />,
  },

])