import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  Calendar,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreVertical,
  Eye,
  Edit,
  Archive
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Dossiers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('tous')

  // Données simulées des dossiers
  const dossiers = [
    {
      id: 1,
      famille: "Martin",
      parents: ["Pierre Martin", "Marie Dubois"],
      enfants: ["Lucas (8 ans)", "Emma (5 ans)"],
      statut: "actif",
      priorite: "normale",
      dernierContact: "2024-01-15",
      messagesTotal: 45,
      messagesNonLus: 3,
      prochainRdv: "2024-01-20",
      tonDominant: "neutre",
      progression: 75
    },
    {
      id: 2,
      famille: "Durand",
      parents: ["Jean Durand", "Sophie Leroy"],
      enfants: ["Théo (12 ans)"],
      statut: "critique",
      priorite: "haute",
      dernierContact: "2024-01-14",
      messagesTotal: 78,
      messagesNonLus: 8,
      prochainRdv: "2024-01-18",
      tonDominant: "tendu",
      progression: 35
    },
    {
      id: 3,
      famille: "Leblanc",
      parents: ["Marc Leblanc", "Julie Moreau"],
      enfants: ["Chloé (6 ans)", "Nathan (9 ans)"],
      statut: "stabilise",
      priorite: "normale",
      dernierContact: "2024-01-12",
      messagesTotal: 23,
      messagesNonLus: 0,
      prochainRdv: "2024-01-25",
      tonDominant: "positif",
      progression: 90
    },
    {
      id: 4,
      famille: "Garcia",
      parents: ["Carlos Garcia", "Amélie Petit"],
      enfants: ["Diego (4 ans)"],
      statut: "nouveau",
      priorite: "normale",
      dernierContact: "2024-01-16",
      messagesTotal: 8,
      messagesNonLus: 2,
      prochainRdv: "2024-01-22",
      tonDominant: "neutre",
      progression: 15
    }
  ]

  const getStatutBadge = (statut) => {
    const variants = {
      'actif': { variant: 'default', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      'critique': { variant: 'destructive', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
      'stabilise': { variant: 'default', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'nouveau': { variant: 'secondary', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' }
    }
    
    return (
      <Badge className={variants[statut]?.className}>
        {statut.charAt(0).toUpperCase() + statut.slice(1)}
      </Badge>
    )
  }

  const getTonBadge = (ton) => {
    const variants = {
      'neutre': { className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
      'positif': { className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'tendu': { className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' }
    }
    
    return (
      <Badge variant="outline" className={variants[ton]?.className}>
        {ton.charAt(0).toUpperCase() + ton.slice(1)}
      </Badge>
    )
  }

  const getPrioriteIcon = (priorite) => {
    if (priorite === 'haute') {
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
    return <Clock className="h-4 w-4 text-gray-400" />
  }

  const filteredDossiers = dossiers.filter(dossier => {
    const matchesSearch = dossier.famille.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dossier.parents.some(parent => parent.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = selectedFilter === 'tous' || dossier.statut === selectedFilter
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des dossiers</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredDossiers.length} dossier(s) trouvé(s)
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouveau dossier</span>
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom de famille ou parent..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              {['tous', 'actif', 'critique', 'stabilise', 'nouveau'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des dossiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDossiers.map((dossier) => (
          <Card key={dossier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Famille {dossier.famille}</CardTitle>
                  {getPrioriteIcon(dossier.priorite)}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatutBadge(dossier.statut)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Archiver
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Informations famille */}
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Parents:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dossier.parents.join(' • ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Enfants:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dossier.enfants.join(' • ')}
                  </p>
                </div>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {dossier.messagesTotal} messages
                  </span>
                  {dossier.messagesNonLus > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {dossier.messagesNonLus}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    RDV: {new Date(dossier.prochainRdv).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              {/* Ton dominant et progression */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ton dominant:
                  </span>
                  {getTonBadge(dossier.tonDominant)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progression:
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {dossier.progression}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dossier.progression >= 70 ? 'bg-green-600' :
                        dossier.progression >= 40 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${dossier.progression}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDossiers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucun dossier trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Aucun dossier ne correspond à vos critères de recherche.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Créer un nouveau dossier
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Dossiers

