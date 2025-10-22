import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.PROD
  ? (import.meta.env.VITE_API_BASE as string) // e.g., "https://your-backend.example.com"
  : ""; // dev: same-origin through Vite proxy
  type LoginResponse = {
  token: string;
  user: { id: string; email: string };
};

const from = (location.state as any)?.from?.pathname || "/home";

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!email || !password) {
    toast({
      title: "Missing info",
      description: "Please enter both email and password.",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);
  try {
    await login(email, password);
    /*
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(res);

    if (!res.ok) {
        const ct = res.headers.get("content-type") || "";
  const body = ct.includes("application/json") ? await res.json() : await res.text();
  const detail = (body as any)?.detail ?? body ?? "Unknown error";
  console.log(`HTTP ${res.status}: ${detail}`);
  throw new Error(`HTTP ${res.status}: ${detail}`);
      /*
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.detail || "Login failed");
    }

    const data: LoginResponse = await res.json();
*/
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    navigate(from, { replace: true }); 
  } catch (err: any) {
    toast({
      title: "Login Failed",
      description: err?.message ?? "Something went wrong.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue1/5 via-white to-brand-blue2/5 p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-brand-blue1">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>     
            </div>
 
            <Link to="/forgot-password" className="block text-sm text-brand-blue1 hover:underline">
              Forgot Password?
            </Link>

            <Button
              type="submit"
              variant="brand"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;