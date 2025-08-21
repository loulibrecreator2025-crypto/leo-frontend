import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Wifi,
  WifiOff,
  TestTube,
  MessageSquare,
  FileText,
  Brain,
  Shield
} from 'lucide-react'
import apiService from '../services/api'
import AuthTest from './AuthTest'

const TestIntegration = () => {
  const [apiStatus, setApiStatus] = useState('checking')
  const [testResults, setTestResults] = useState({})
  const [testMessage, setTestMessage] = useState("Tu ne comprends jamais rien ! C'est toujours pareil avec toi.")
  const [testDocument, setTestDocument] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      await apiService.healthCheck()
      setApiStatus('connected')
    } catch (error) {
      setApiStatus('disconnected')
    }
  }

  const runTest = async (testName, testFunction) => {
    setLoading(true)
    setTestResults(prev => ({ ...prev, [testName]: 'running' }))
    
    try {
      const result = await testFunction()
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { status: 'success', data: result } 
      }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { status: 'error', error: error.message } 
      }))
    } finally {
      setLoading(false)
    }
  }

  const testSentimentAnalysis = async () => {
    return await apiService.analyzeSentiment(testMessage)
  }

  const testMessageRephrasing = async () => {
    return await apiService.rephraseMessage(testMessage)
  }

  const testMirrorMode = async () => {
    return await apiService.getMirrorFeedback(testMessage)
  }

  const testLegalProcessing = async () => {
    const sampleDocument = `
    TRIBUNAL JUDICIAIRE DE PARIS
    JUGEMENT DU 15 JANVIER 2024
    
    Affaire: Divorce par consentement mutuel
    Demandeurs: M. Pierre MARTIN et Mme Marie DUBOIS
    
    ORDONNE:
    - La garde alternée de l'enfant Lucas MARTIN (8 ans)
    - Pension alimentaire: 450€ par mois
    - Droit de visite: week-ends alternés
    
    Fait à Paris, le 15 janvier 2024
    `
    return await apiService.processLegalDocument(sampleDocument)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status) => {
    if (typeof status === 'string') {
      switch (status) {
        case 'success':
          return <Badge className="bg-green-100 text-green-800">Succès</Badge>
        case 'error':
          return <Badge className="bg-red-100 text-red-800">Erreur</Badge>
        case 'running':
          return <Badge className="bg-blue-100 text-blue-800">En cours...</Badge>
        default:
          return <Badge variant="secondary">Non testé</Badge>
      }
    }
    
    if (status?.status) {
      return getStatusBadge(status.status)
    }
    
    return <Badge variant="secondary">Non testé</Badge>
  }

  const tests = [
    {
      id: 'sentiment',
      name: 'Analyse de sentiment',
      description: 'Test du module de détection émotionnelle',
      icon: Brain,
      testFunction: testSentimentAnalysis
    },
    {
      id: 'rephrasing',
      name: 'Reformulation de message',
      description: 'Test du module de reformulation intelligente',
      icon: MessageSquare,
      testFunction: testMessageRephrasing
    },
    {
      id: 'mirror',
      name: 'Mode miroir',
      description: 'Test du feedback émotionnel avant envoi',
      icon: Shield,
      testFunction: testMirrorMode
    },
    {
      id: 'legal',
      name: 'Traitement juridique',
      description: 'Test du module OCR/NLP juridique',
      icon: FileText,
      testFunction: testLegalProcessing
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tests d'intégration</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Validation des modules IA et de l'API backend
          </p>
        </div>
        <Button onClick={checkApiHealth} variant="outline">
          Vérifier la connexion
        </Button>
      </div>

      {/* Authentification */}
      <AuthTest onAuthSuccess={() => setApiStatus('connected')} />

      {/* API Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {apiStatus === 'connected' ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-600" />
            )}
            <span>État de l'API Backend</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge 
              className={
                apiStatus === 'connected' 
                  ? 'bg-green-100 text-green-800' 
                  : apiStatus === 'disconnected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }
            >
              {apiStatus === 'connected' ? 'Connecté' : 
               apiStatus === 'disconnected' ? 'Déconnecté' : 'Vérification...'}
            </Badge>
            <span className="text-sm text-gray-600">
              {apiStatus === 'connected' 
                ? 'L\'API backend est accessible sur http://localhost:5000'
                : 'Impossible de joindre l\'API backend. Vérifiez que le serveur Flask est démarré.'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Test Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration des tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Message de test:</label>
            <Textarea
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              placeholder="Entrez un message à tester..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tests.map((test) => {
          const Icon = test.icon
          const result = testResults[test.id]
          
          return (
            <Card key={test.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <span>{test.name}</span>
                  </div>
                  {getStatusIcon(result?.status || 'idle')}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {test.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Statut:</span>
                    {getStatusBadge(result)}
                  </div>
                  <Button
                    onClick={() => runTest(test.id, test.testFunction)}
                    disabled={loading || apiStatus !== 'connected'}
                    size="sm"
                  >
                    <TestTube className="h-4 w-4 mr-2" />
                    Tester
                  </Button>
                </div>
                
                {result?.data && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-2">Résultat:</p>
                    <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
                
                {result?.error && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                      Erreur:
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {result.error}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Run All Tests */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Exécuter tous les tests</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lance tous les tests d'intégration en séquence
              </p>
            </div>
            <Button
              onClick={() => {
                tests.forEach(test => {
                  setTimeout(() => runTest(test.id, test.testFunction), 
                           tests.indexOf(test) * 1000)
                })
              }}
              disabled={loading || apiStatus !== 'connected'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <TestTube className="h-4 w-4 mr-2" />
              Lancer tous les tests
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TestIntegration

