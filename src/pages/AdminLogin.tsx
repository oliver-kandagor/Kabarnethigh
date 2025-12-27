import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, Mail, Lock, ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(128),
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(128),
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
});

const AdminLogin = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signIn, signUp, signOut, user, hasAnyRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rolesChecked, setRolesChecked] = useState(false);

  // Wait for roles to load before deciding where to redirect
  useEffect(() => {
    if (!loading && user) {
      const timer = setTimeout(() => {
        setRolesChecked(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  useEffect(() => {
    if (rolesChecked && user && hasAnyRole) {
      navigate('/admin');
    }
  }, [rolesChecked, user, hasAnyRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (mode === 'login') {
      const validation = loginSchema.safeParse({ email, password });
      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message === 'Invalid login credentials' 
            ? "Invalid email or password. Please try again."
            : error.message,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } else {
      const validation = signupSchema.safeParse({ email, password, fullName });
      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      const { error } = await signUp(email, password, fullName);
      
      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created",
          description: "Please contact the administrator to activate your admin access.",
        });
        setMode('login');
      }
      setIsLoading(false);
    }
  };

  if (loading || (user && !rolesChecked)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // User is logged in but has no roles - show pending approval
  if (user && rolesChecked && !hasAnyRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-school-green-900 via-school-green-800 to-school-green-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border/50 text-center">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              Pending Approval
            </h1>
            <p className="text-muted-foreground mb-6">
              Your account has been created but you don't have admin access yet. Please contact the administrator to get your role assigned.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Logged in as: <span className="font-medium">{user.email}</span>
            </p>
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-green-900 via-school-green-800 to-school-green-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              {mode === 'login' ? 'Admin Login' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground mt-2">Kabarnet High School CMS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Super Admin"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kabarnethigh.sc.ke"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); }}
              className="text-sm text-primary hover:underline"
            >
              {mode === 'login' ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
            
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Website
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-school-cream/60 text-sm mt-6">
          Contact the school administration for access credentials
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
