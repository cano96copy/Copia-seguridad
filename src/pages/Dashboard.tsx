import { useUser, useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  FileText, 
  Mail, 
  Video, 
  TrendingUp,
  Clock,
  Crown,
  LogOut,
  Settings,
  ChevronRight,
  Zap,
  BarChart3,
  PenTool,
  Home,
  AlertTriangle,
  Menu,
  X
} from "lucide-react";
import { getUserSubscription } from "@/lib/subscriptions";

interface GPTItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

const sidebarGpts: GPTItem[] = [
  { id: "linkedin", name: "Posts de LinkedIn", icon: TrendingUp },
  { id: "sales-letter", name: "Cartas de Venta", icon: FileText },
  { id: "landing", name: "Páginas de Registro", icon: PenTool },
  { id: "ads", name: "Guiones de Ads", icon: Video },
  { id: "welcome-sequence", name: "Secuencia Bienvenida", icon: Mail },
  { id: "pre-webinar", name: "Emails Pre-Webinar", icon: Clock },
  { id: "post-webinar", name: "Emails Post-Webinar", icon: Zap },
];

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeGpt, setActiveGpt] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!user) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const data = await getUserSubscription(user.id);
        setSubscription(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, isLoaded, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Sparkles className="h-12 w-12 text-primary animate-spin" />
          <p className="text-gray-500">Cargando tu panel...</p>
        </div>
      </div>
    );
  }

  const planName = subscription?.subscription?.plans?.name || "Free";
  const subscriptionStatus = subscription?.subscription?.status || "inactive";
  const isSubscriptionActive = subscriptionStatus === "active" || subscriptionStatus === "trialing";
  const generationsUsed = subscription?.user?.credits_used || 0;
  const generationsLimit = subscription?.subscription?.plans?.features?.generations_per_month || 10;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Copy<span className="text-primary">Maestro</span>
              </span>
            </div>
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {/* Inicio */}
          <div className="mb-6">
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary bg-primary/5 font-medium"
              onClick={() => setActiveGpt(null)}
            >
              <Home className="h-5 w-5" />
              <span>Inicio</span>
            </button>
          </div>

          {/* GPTs Section */}
          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              GPTs de Copywriting
            </p>
            <div className="space-y-1">
              {sidebarGpts.map((gpt) => {
                const Icon = gpt.icon;
                const isActive = activeGpt === gpt.id;
                return (
                  <button
                    key={gpt.id}
                    onClick={() => setActiveGpt(gpt.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive 
                        ? 'text-primary bg-primary/5 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{gpt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Otros */}
          <div>
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Otros
            </p>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
                <Settings className="h-5 w-5" />
                <span className="text-sm">Configuración</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer - User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
              {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName || "Usuario"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.emailAddresses?.[0]?.emailAddress}
              </p>
            </div>
            <button 
              onClick={handleSignOut}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button 
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
                
                <h1 className="text-xl font-semibold text-gray-900">
                  {activeGpt 
                    ? sidebarGpts.find(g => g.id === activeGpt)?.name 
                    : `¡Hola, ${user?.firstName || "Copywriter"}!`
                  }
                </h1>
              </div>

              <div className="flex items-center gap-4">
                {/* Plan Badge */}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Crown className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Plan {planName}</span>
                </div>

                {/* Upgrade Button */}
                {planName === "Free" && (
                  <Button 
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                    onClick={() => navigate("/plans")}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Mejorar Plan
                  </Button>
                )}

                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Subscription Alert Banner */}
          {!isSubscriptionActive && (
            <div className="mb-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Sin Suscripción Activa</h3>
                  <p className="text-white/90 text-sm">No tienes ninguna suscripción activa.</p>
                </div>
              </div>
              <Button className="bg-white text-amber-600 hover:bg-white/90 font-semibold px-6">
                Activar
              </Button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Generations Used */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Este mes</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {generationsUsed}/{generationsLimit === "unlimited" ? "∞" : generationsLimit}
              </div>
              <p className="text-gray-500 text-sm">Generaciones usadas</p>
              {generationsLimit !== "unlimited" && (
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all"
                    style={{ width: `${Math.min((generationsUsed / generationsLimit) * 100, 100)}%` }}
                  />
                </div>
              )}
            </div>

            {/* Plan */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-amber-500" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Plan actual</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{planName}</div>
              <p className="text-gray-500 text-sm">
                {planName === "Free" ? "Actualiza para más funciones" : "Acceso completo"}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-emerald-500" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">GPTs</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">7</div>
              <p className="text-gray-500 text-sm">Asistentes disponibles</p>
            </div>
          </div>

          {/* Content Area - Show selected GPT or Welcome */}
          {!activeGpt ? (
            <>
              {/* Welcome Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  ¿Qué tipo de copy quieres crear hoy?
                </h2>
                <p className="text-gray-500">Selecciona un asistente del menú lateral para empezar</p>
              </div>

              {/* Quick Access GPT Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sidebarGpts.map((gpt) => {
                  const Icon = gpt.icon;
                  return (
                    <button
                      key={gpt.id}
                      onClick={() => setActiveGpt(gpt.id)}
                      className="group bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-primary hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {gpt.name}
                          </h3>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* GPT Content Area */
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const gpt = sidebarGpts.find(g => g.id === activeGpt);
                    const Icon = gpt?.icon || Sparkles;
                    return <Icon className="h-8 w-8 text-primary" />;
                  })()}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {sidebarGpts.find(g => g.id === activeGpt)?.name}
                </h2>
                <p className="text-gray-500 mb-6">
                  Aquí podrás generar contenido con este asistente
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Empezar a crear
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
