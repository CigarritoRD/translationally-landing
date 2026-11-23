import { createBrowserRouter } from 'react-router-dom'
import { PublicSite } from './PublicSite'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicSite />,
  },
])
