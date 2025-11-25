import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí iría la lógica de login real
      console.log("Login exitoso:", formData);
      // Navegar a dashboard o página principal
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-foreground hover:text-primary transition-colors inline-block mb-2"
          >
            Copy<span className="text-primary">Maestro</span>
          </button>
          <p className="text-muted-foreground">
            Bienvenido de vuelta
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl shadow-2xl border border-border p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Iniciar sesión
            </h2>
            <p className="text-muted-foreground">
              Accede a tu cuenta de CopyMaestro
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 h-12 ${errors.email ? "border-destructive" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => console.log("Recuperar contraseña")}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 h-12 ${errors.password ? "border-destructive" : ""}`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold"
            >
              Iniciar sesión
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-primary font-medium hover:underline"
              >
                Regístrate gratis
              </button>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

