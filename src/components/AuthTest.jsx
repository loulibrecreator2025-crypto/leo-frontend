import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { User, Lock, UserPlus } from 'lucide-react'
import apiService from '../services/api'

const AuthTest = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('testpassword123')
  const [username, setUsername] = useState('TestUser')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(apiService.isAuthenticated())

  const handleLogin = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const result = await apiService.login(email, password)
      setMessage(`Connexion réussie ! Bienvenue ${result.user.username}`)
      setIsAuthenticated(true)
      if (onAuthSuccess) onAuthSuccess()
    } catch (error) {
      setMessage(`Erreur de connexion: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const result = await apiService.register({
        username,
        email,
        password,
        role: 'pro'
      })
      setMessage(`Inscription réussie ! Bienvenue ${result.user.username}`)
      setIsAuthenticated(true)
      if (onAuthSuccess) onAuthSuccess()
    } catch (error) {
      setMessage(`Erreur d'inscription: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await apiService.logout()
    setIsAuthenticated(false)
    setMessage('Déconnexion réussie')
  }

  if (isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-green-600" />
            <span>Authentifié</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800">Connecté</Badge>
            <span className="text-sm text-gray-600">
              Token JWT valide
            </span>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Se déconnecter
          </Button>
          {message && (
            <p className="text-sm text-gray-600">{message}</p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lock className="h-5 w-5" />
          <span>Authentification requise</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nom d'utilisateur:</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Mot de passe:</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="flex-1"
          >
            <User className="h-4 w-4 mr-2" />
            Se connecter
          </Button>
          <Button 
            onClick={handleRegister} 
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            S'inscrire
          </Button>
        </div>
        
        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('Erreur') 
              ? 'bg-red-50 text-red-800' 
              : 'bg-green-50 text-green-800'
          }`}>
            {message}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>Compte de test pré-configuré :</p>
          <p>Email: test@example.com</p>
          <p>Mot de passe: testpassword123</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AuthTest

