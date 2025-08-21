import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Plus,
  FileText
} from 'lucide-react'

const SimpleDashboard = () => {
  // Données simulées pour le tableau de bord
  const stats = [
    {
      title: "Dossiers actifs",
      value: "24",
      change: "+3 cette semaine",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Messages traités",
      value: "156",
      change: "+12 aujourd'hui",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      title: "Taux d'apaisement",
      value: "87%",
      change: "+5% ce mois",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Alertes actives",
      value: "3",
      change: "-2 depuis hier",
      icon: AlertTriangle,
      color: "text-orange-600"
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: "message",
      family: "Famille Martin",
      action: "Message reformulé",
      time: "Il y a 5 min",
      status: "success"
    },
    {
      id: 2,
      type: "document",
      family: "Famille Durand",
      action: "Jugement analysé",
      time: "Il y a 15 min",
      status: "success"
    },
    {
      id: 3,
      type: "alert",
      family: "Famille Leblanc",
      action: "Tension détectée",
      time: "Il y a 1h",
      status: "warning"
    },
    {
      id: 4,
      type: "message",
      family: "Famille Garcia",
      action: "Réponse assistée",
      time: "Il y a 2h",
      status: "success"
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Graphiques simulés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activité hebdomadaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Activité hebdomadaire</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Graphique d'activité</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Messages et conflits par jour</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Répartition des sentiments */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des sentiments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <div className="flex justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                    <span className="text-sm">Neutre (65%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span className="text-sm">Positif (25%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="text-sm">Tendu (10%)</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Analyse des sentiments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(activity.status)}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.family}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                  <Badge 
                    variant={activity.status === 'success' ? 'default' : 'secondary'}
                    className={
                      activity.status === 'success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : activity.status === 'warning'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }
                  >
                    {activity.status === 'success' ? 'Traité' : 
                     activity.status === 'warning' ? 'Attention' : 'En cours'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Nouveau dossier</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Analyser document</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>Rapport mensuel</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SimpleDashboard

