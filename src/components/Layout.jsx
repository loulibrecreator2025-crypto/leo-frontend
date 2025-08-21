import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Moon, 
  Sun,
  LogOut,
  Heart
} from 'lucide-react'

const Layout = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'dossiers', label: 'Dossiers', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'statistiques', label: 'Statistiques', icon: BarChart3 },
    { id: 'tests', label: 'Tests', icon: Settings },
    { id: 'parametres', label: 'Paramètres', icon: Settings }
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Léo Pro</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  currentPage === item.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="flex items-center space-x-2"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="text-sm">{darkMode ? 'Clair' : 'Sombre'}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'lg:ml-64' : 'ml-0'
      }`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {menuItems.find(item => item.id === currentPage)?.label || 'Tableau de bord'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                En ligne
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">MP</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Médiateur Pro</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout

