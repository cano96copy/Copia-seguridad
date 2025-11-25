import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí iría la lógica de registro real
      console.log("Registro exitoso:", formData);
      // Navegar a la página principal o dashboard
      navigate("/");
    }
  };

  const benefits = [
    "Acceso a todos los GPTs especializados",
    "Generación ilimitada de contenido",
    "Soporte prioritario 24/7",
    "Actualizaciones y nuevos GPTs gratis",
    "Sin permanencia, cancela cuando quieras"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Copy<span className="text-primary">Maestro</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="hidden lg:block">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Comienza a crear copy profesional en{" "}
              <span className="text-primary">segundos</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Únete a miles de profesionales que ya están transformando su forma de crear contenido
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">5K+</div>
                <div className="text-sm text-muted-foreground">Usuarios activos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">4.9/5</div>
                <div className="text-sm text-muted-foreground">Valoración</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Textos creados</div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card rounded-2xl shadow-2xl border border-border p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Crea tu cuenta
                </h2>
                <p className="text-muted-foreground">
                  Empieza gratis, sin tarjeta de crédito
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nombre completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 h-12 ${errors.name ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

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
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 h-12 ${errors.password ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmar contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 h-12 ${errors.confirmPassword ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => {
                      setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }));
                      if (errors.acceptTerms) {
                        setErrors(prev => ({ ...prev, acceptTerms: "" }));
                      }
                    }}
                    className={errors.acceptTerms ? "border-destructive" : ""}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    Acepto los{" "}
                    <a href="#" className="text-primary hover:underline">
                      términos y condiciones
                    </a>{" "}
                    y la{" "}
                    <a href="#" className="text-primary hover:underline">
                      política de privacidad
                    </a>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-xs text-destructive -mt-2">{errors.acceptTerms}</p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold"
                >
                  Crear cuenta gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-primary font-medium hover:underline"
                  >
                    Inicia sesión
                  </button>
                </p>
              </div>
            </div>

            {/* Mobile Benefits */}
            <div className="lg:hidden mt-8 space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

