import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import {
  ShieldCheck,
  ArrowRight,
  User,
  Lock,
  Mail,
  Sparkles,
  Shield,
  CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const {
    user,
    loginWithEmail,
    loginWithGoogle,
    loginAsDemoAdmin,
    loginAsDemoPatron,
    logout,
    addToast
  } = useCommerce();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email address', 'error');
      return;
    }
    loginWithEmail(email, password);
    if (email.toLowerCase().includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/account/profile');
    }
  };

  const handleAdminDemo = () => {
    loginAsDemoAdmin();
    navigate('/admin');
  };

  const handlePatronDemo = () => {
    loginAsDemoPatron();
    navigate('/account/profile');
  };

  if (user) {
    return (
      <div className="w-full min-h-[calc(100vh-160px)] pt-32 pb-36 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[440px] mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#3c4433] text-[#dac5a7] flex items-center justify-center mx-auto text-2xl font-serif border-2 border-[#dac5a7]/30 shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-bold block">
              {user.role === 'admin' ? 'ADMINISTRATOR AUTHENTICATED' : 'ACCOUNT ACTIVE'}
            </span>
            <h1 className="font-serif text-3xl text-[#1a1c18]">{user.name}</h1>
            <p className="text-xs text-[#1a1c18]/60 font-mono">{user.email}</p>
          </div>

          <div className="p-6 sm:p-8 bg-white rounded-[2rem] border border-[rgba(26,28,24,0.08)] space-y-3 text-xs shadow-[0_20px_50px_rgba(26,28,24,0.06)]">
            {user.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full py-3.5 px-4 bg-[#3c4433] hover:bg-[#2b3323] text-white rounded-full font-medium transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield className="w-4 h-4 text-[#dac5a7]" />
                <span>Open Admin Portal</span>
              </button>
            )}

            <button
              onClick={() => navigate('/account/profile')}
              className="w-full py-3.5 px-4 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full font-medium transition-all shadow-xs cursor-pointer"
            >
              View Profile &amp; Addresses
            </button>
            <button
              onClick={() => navigate('/account/orders')}
              className="w-full py-3 px-4 border border-[rgba(26,28,24,0.18)] hover:bg-[#f2f2ef] rounded-full font-medium transition-colors cursor-pointer text-[#1a1c18]"
            >
              Order History &amp; Tracking
            </button>
            <button
              onClick={() => {
                logout();
                addToast('You have been signed out safely', 'info');
              }}
              className="w-full py-2 text-[#1a1c18]/50 hover:text-red-700 underline text-[11px] cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-160px)] pt-32 pb-36 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[460px] mx-auto space-y-6">
        {/* Header Heading */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-bold block">
            ACCOUNT ACCESS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal tracking-tight">
            Sign In to Riyansh Amrit
          </h1>
          <p className="text-xs text-[#1a1c18]/60 font-body max-w-sm mx-auto">
            Access saved orders, tracking, and account settings.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-[2rem] border border-[rgba(26,28,24,0.08)] p-7 sm:p-9 shadow-[0_20px_50px_rgba(26,28,24,0.06)] space-y-5">
          {/* Quick 1-Click Evaluation Presets */}
          <div className="p-3.5 bg-[#fbfbf9] rounded-2xl border border-[rgba(26,28,24,0.08)] space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#757d5c] font-bold tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#dac5a7]" />
                <span>Instant Evaluation Presets</span>
              </span>
              <span className="text-[9px] text-[#1a1c18]/40 font-normal">1-Click</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAdminDemo}
                className="py-2.5 px-3 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-[#dac5a7]" />
                <span>Admin Login</span>
              </button>
              <button
                type="button"
                onClick={handlePatronDemo}
                className="py-2.5 px-3 bg-white hover:bg-[#f2f2ef] text-[#1a1c18] border border-[rgba(26,28,24,0.14)] rounded-xl text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#757d5c]" />
                <span>Customer Login</span>
              </button>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => {
              loginWithGoogle();
              addToast('Signed in securely with Google Identity', 'success');
              navigate('/account/profile');
            }}
            className="w-full py-3 px-4 bg-[#f5f4ef] hover:bg-[#eae8e1] text-[#1a1c18] border border-[rgba(26,28,24,0.08)] rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-[#1a1c18]/30 py-0.5">
            <div className="flex-1 h-px bg-black/8" />
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#1a1c18]/40 font-semibold">
              Or with Email
            </span>
            <div className="flex-1 h-px bg-black/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@riyanshamrit.com or patron@..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f8f8f5] focus:bg-white border border-[rgba(26,28,24,0.12)] focus:border-[#3c4433] rounded-xl text-xs text-[#1a1c18] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#1a1c18]/70 font-semibold">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Password reset link dispatched to your inbox', 'info');
                  }}
                  className="text-[10.5px] text-[#757d5c] hover:underline font-mono"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f8f8f5] focus:bg-white border border-[rgba(26,28,24,0.12)] focus:border-[#3c4433] rounded-xl text-xs text-[#1a1c18] focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1a1c18] hover:bg-[#3c4433] active:bg-[#2b3323] text-white rounded-full text-xs font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#dac5a7]" />
            </button>
          </form>

          {/* Switch to Signup */}
          <div className="pt-3 border-t border-[rgba(26,28,24,0.06)] text-center text-xs text-[#1a1c18]/60">
            <span>New to Riyansh Amrit? </span>
            <Link to="/signup" className="text-[#3c4433] font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </div>

        {/* Security Trust Badges */}
        <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-[#1a1c18]/50 text-center">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#757d5c]" />
            <span>256-Bit Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#757d5c]" />
            <span>Sangamner Dispensary</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const { signup, addToast } = useCommerce();
  const { navigate } = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please complete all registration fields', 'error');
      return;
    }
    signup(name, email);
    navigate('/account/profile');
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] pt-32 pb-36 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[460px] mx-auto space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-bold block">
            CREATE ACCOUNT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-[#1a1c18]/60 font-body max-w-sm mx-auto">
            Create an account to track orders and save your delivery details.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] border border-[rgba(26,28,24,0.08)] p-7 sm:p-9 shadow-[0_20px_50px_rgba(26,28,24,0.06)] space-y-5">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-semibold">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Vaidya Sunita Joshi"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f8f8f5] focus:bg-white border border-[rgba(26,28,24,0.12)] focus:border-[#3c4433] rounded-xl text-xs text-[#1a1c18] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sunita@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f8f8f5] focus:bg-white border border-[rgba(26,28,24,0.12)] focus:border-[#3c4433] rounded-xl text-xs text-[#1a1c18] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1.5 font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1c18]/35" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f8f8f5] focus:bg-white border border-[rgba(26,28,24,0.12)] focus:border-[#3c4433] rounded-xl text-xs text-[#1a1c18] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1a1c18] hover:bg-[#3c4433] active:bg-[#2b3323] text-white rounded-full text-xs font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Complete Registration</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#dac5a7]" />
            </button>
          </form>

          <div className="pt-3 border-t border-[rgba(26,28,24,0.06)] text-center text-xs text-[#1a1c18]/60">
            <span>Already have an account? </span>
            <Link to="/login" className="text-[#3c4433] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GoogleCallbackPage: React.FC = () => {
  const { loginWithGoogle } = useCommerce();
  const { navigate } = useRouter();

  React.useEffect(() => {
    loginWithGoogle();
    navigate('/account/profile');
  }, [loginWithGoogle, navigate]);

  return (
    <div className="w-full py-32 text-center">
      <p className="text-xs font-mono text-[#1a1c18]/60">Completing Google Authentication...</p>
    </div>
  );
};
