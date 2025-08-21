import { useState } from 'react'
import Layout from './components/Layout'
import SimpleDashboard from './components/SimpleDashboard'
import Dossiers from './components/Dossiers'
import TestIntegration from './components/TestIntegration'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <SimpleDashboard />
      case 'dossiers':
        return <Dossiers />
      case 'documents':
        return <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Gestion des documents</h2>
          <p className="text-gray-600">Module en cours de développement...</p>
        </div>
      case 'statistiques':
        return <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Statistiques avancées</h2>
          <p className="text-gray-600">Module en cours de développement...</p>
        </div>
      case 'parametres':
        return <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Paramètres</h2>
          <p className="text-gray-600">Module en cours de développement...</p>
        </div>
      case 'tests':
        return <TestIntegration />
      default:
        return <SimpleDashboard />
    }
  }

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App
