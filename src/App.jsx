import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Contact from './pages/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'berita', element: <News /> },
      { path: 'berita/:slug', element: <NewsDetail /> },
      { path: 'acara', element: <Events /> },
      { path: 'acara/:slug', element: <EventDetail /> },
      { path: 'kontak', element: <Contact /> },
    ],
  },
])

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  )
}
