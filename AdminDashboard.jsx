import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart
} from 'recharts';
import { 
  Bell, AlertTriangle, CheckCircle, Clock, Users, TrendingUp, TrendingDown,
  Search, Filter, Download, RefreshCw, Eye, Edit, Shield, Building2,
  Activity, DollarSign, FileText, Settings, MapPin, BarChart3,
  User, UserCheck, UserX, Calendar, Target, Award, Zap,
  ArrowUpRight, ArrowDownRight, MoreVertical, Plus, Minus,
  Globe, Smartphone, CreditCard, Banknote,
  ChevronDown, ChevronRight, ChevronLeft, Home, LogOut, Menu
} from 'lucide-react';

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState('BANK_ADMIN'); // BANK_ADMIN ou AGENCY_DIRECTOR
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedAgence, setSelectedAgence] = useState('all');

  // Mock data enrichies
  const [dashboardData, setDashboardData] = useState({
    // Statistiques générales
    totalClients: 15428,
    totalAgences: 24,
    totalComptes: 18753,
    totalVolume: 2850000000, // 2.85 milliards FCFA
    croissanceMensuelle: 12.5,
    
    // KPIs financiers
    depots: 1200000000,
    retraits: 850000000,
    transferts: 650000000,
    fraisGeneres: 45000000,
    
    // Révisions en attente
    revisionsEnAttente: 47,
    demandesUrgentes: 8,
    alertesFraude: 3,
    
    // Performance agences
    agencePerformances: [
      { id: 'AG001', nom: 'Douala Centre', clients: 2450, volume: 850000000, croissance: 15.2, status: 'excellent' },
      { id: 'AG002', nom: 'Yaoundé Bastos', clients: 1980, volume: 720000000, croissance: 12.8, status: 'bon' },
      { id: 'AG003', nom: 'Bafoussam', clients: 1560, volume: 420000000, croissance: 8.3, status: 'moyen' },
      { id: 'AG004', nom: 'Garoua', clients: 890, volume: 180000000, croissance: -2.1, status: 'attention' }
    ]
  });

  const agencesData = [
    { id: 'AG001', nom: 'Douala Centre', region: 'Littoral', directeur: 'M. Ngono Paul' },
    { id: 'AG002', nom: 'Yaoundé Bastos', region: 'Centre', directeur: 'Mme Fouda Marie' },
    { id: 'AG003', nom: 'Bafoussam', region: 'Ouest', directeur: 'M. Kamga Jean' },
    { id: 'AG004', nom: 'Garoua', region: 'Nord', directeur: 'M. Hamadou Ali' }
  ];

  const volumesTrend = [
    { date: '2025-01', depots: 980000000, retraits: 720000000, transferts: 540000000 },
    { date: '2025-02', depots: 1050000000, retraits: 780000000, transferts: 580000000 },
    { date: '2025-03', depots: 1120000000, retraits: 820000000, transferts: 620000000 },
    { date: '2025-04', depots: 1180000000, retraits: 850000000, transferts: 650000000 },
    { date: '2025-05', depots: 1250000000, retraits: 890000000, transferts: 680000000 },
    { date: '2025-06', depots: 1320000000, retraits: 920000000, transferts: 720000000 }
  ];

  const riskAnalysis = [
    { category: 'KYC', score: 85, max: 100 },
    { category: 'Transactions', score: 92, max: 100 },
    { category: 'Fraude', score: 78, max: 100 },
    { category: 'Conformité', score: 88, max: 100 },
    { category: 'Opérationnel', score: 91, max: 100 }
  ];

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B FCFA`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M FCFA`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K FCFA`;
    }
    return `${amount} FCFA`;
  };

  const KPICard = ({ title, value, icon: Icon, trend, trendValue, color = 'blue', subtitle }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-xl bg-gradient-to-r from-${color}-500 to-${color}-600 text-white shadow-lg`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
            trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`${sidebarCollapsed ? 'w-16' : 'w-72'} bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-xl font-bold">Admin Portal</h1>
              <p className="text-sm text-gray-300 mt-1">
                {userRole === 'BANK_ADMIN' ? 'Direction Générale' : 'Direction Agence'}
              </p>
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {/* Sélecteur de rôle */}
          {!sidebarCollapsed && (
            <div className="mb-6">
              <select 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="BANK_ADMIN">Directeur Banque</option>
                <option value="AGENCY_DIRECTOR">Directeur Agence</option>
              </select>
            </div>
          )}

          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: Home },
            { id: 'analytics', label: 'Analyses', icon: BarChart3 },
            { id: 'agencies', label: userRole === 'BANK_ADMIN' ? 'Agences' : 'Mon Agence', icon: Building2 },
            { id: 'clients', label: 'Clients', icon: Users },
            { id: 'transactions', label: 'Transactions', icon: CreditCard },
            { id: 'risk', label: 'Gestion Risques', icon: Shield },
            { id: 'reports', label: 'Rapports', icon: FileText }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Sélecteur d'agence pour directeur banque */}
        {userRole === 'BANK_ADMIN' && !sidebarCollapsed && (
          <div className="mt-8 p-4 bg-gray-800 rounded-xl">
            <h3 className="text-sm font-medium mb-3">Filtrer par agence</h3>
            <select 
              value={selectedAgence}
              onChange={(e) => setSelectedAgence(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600"
            >
              <option value="all">Toutes les agences</option>
              {agencesData.map(agence => (
                <option key={agence.id} value={agence.id}>{agence.nom}</option>
              ))}
            </select>
          </div>
        )}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
            A
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@bank.cm</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* En-tête avec métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Volume Total"
          value={formatCurrency(dashboardData.totalVolume)}
          subtitle="Transactions mensuelles"
          icon={DollarSign}
          trend="up"
          trendValue="+12.5%"
          color="green"
        />
        <KPICard
          title="Clients Actifs"
          value={dashboardData.totalClients.toLocaleString()}
          subtitle={userRole === 'BANK_ADMIN' ? 'Toutes agences' : 'Mon agence'}
          icon={Users}
          trend="up"
          trendValue="+8.3%"
          color="blue"
        />
        <KPICard
          title="Frais Générés"
          value={formatCurrency(dashboardData.fraisGeneres)}
          subtitle="Ce mois"
          icon={Target}
          trend="up"
          trendValue="+15.2%"
          color="purple"
        />
        <KPICard
          title="Alertes"
          value={dashboardData.alertesFraude}
          subtitle="Nécessitent attention"
          icon={AlertTriangle}
          trend="down"
          trendValue="-25%"
          color="red"
        />
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume des transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Évolution des Volumes</h3>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="6m">6 derniers mois</option>
              <option value="1y">1 an</option>
              <option value="2y">2 ans</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={volumesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { month: 'short' })} />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => [formatCurrency(value), '']} />
              <Area type="monotone" dataKey="depots" stackId="1" stroke="#10B981" fill="rgba(16, 185, 129, 0.1)" />
              <Area type="monotone" dataKey="retraits" stackId="1" stroke="#F59E0B" fill="rgba(245, 158, 11, 0.1)" />
              <Line type="monotone" dataKey="transferts" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Analyse des risques */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Profil de Risque</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={riskAnalysis}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance des agences (pour directeur banque) */}
      {userRole === 'BANK_ADMIN' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance des Agences</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              Nouvelle Agence
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardData.agencePerformances.map((agence) => (
              <div key={agence.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{agence.nom}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    agence.status === 'excellent' ? 'bg-green-100 text-green-700' :
                    agence.status === 'bon' ? 'bg-blue-100 text-blue-700' :
                    agence.status === 'moyen' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {agence.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Clients</span>
                    <span className="font-medium">{agence.clients.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Volume</span>
                    <span className="font-medium">{formatCurrency(agence.volume)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Croissance</span>
                    <span className={`font-medium ${agence.croissance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {agence.croissance >= 0 ? '+' : ''}{agence.croissance}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alertes et actions urgentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Urgentes</h3>
          <div className="space-y-4">
            {[
              { type: 'fraud', message: 'Tentative de fraude détectée - Client CLI-456', priority: 'high', time: '5 min' },
              { type: 'limit', message: 'Limite de liquidité atteinte - Agence Douala', priority: 'medium', time: '12 min' },
              { type: 'kyc', message: '15 dossiers KYC en attente de validation', priority: 'medium', time: '1h' },
              { type: 'system', message: 'Maintenance système programmée demain', priority: 'low', time: '2h' }
            ].map((alert, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className={`w-3 h-3 rounded-full ${
                  alert.priority === 'high' ? 'bg-red-500' :
                  alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">Il y a {alert.time}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Traiter
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicateurs Temps Réel</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Taux d'approbation</span>
                <span className="text-2xl font-bold text-green-600">94.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Capacité système</span>
                <span className="text-2xl font-bold text-blue-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">SLA respect</span>
                <span className="text-2xl font-bold text-purple-600">91.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91.8%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userRole === 'BANK_ADMIN' ? 'Direction Générale' : 'Direction Agence'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Tableau de bord - {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {dashboardData.alertesFraude}
                </span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Module Analyses</h3>
              <p className="text-gray-500">Analyses détaillées et reporting avancé</p>
            </div>
          )}
          {activeTab === 'agencies' && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {userRole === 'BANK_ADMIN' ? 'Gestion des Agences' : 'Mon Agence'}
              </h3>
              <p className="text-gray-500">
                {userRole === 'BANK_ADMIN' 
                  ? 'Vue d\'ensemble et gestion de toutes les agences' 
                  : 'Détails et gestion de votre agence'
                }
              </p>
            </div>
          )}
          {/* Autres onglets... */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;