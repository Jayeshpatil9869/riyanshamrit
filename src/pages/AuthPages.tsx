import React, { useState } from 'react';
import { useRouter, Link } from '../context/RouterContext';
import { useCommerce } from '../context/CommerceContext';
import { ShieldCheck, ArrowRight, User, Lock, Mail, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { user, loginWithEmail, loginWithGoogle, logout, addToast } = useCommerce();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password', 'error');
      return;
    }
    loginWithEmail(email, password);
    addToast('Welcome back to your Riyansh Patron Portal', 'success');
    navigate('/account/orders');
  };

  const handleGoogleAuth = () => {
    loginWithGoogle();
    addToast('Signed in securely with Google Identity', 'success');
    navigate('/account/orders');
  };

  if (user) {
    return (
      <div className="w-full py-20">
        <div className="kanva-container max-w-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#3c4433] text-[#dac5a7] flex items-center justify-center mx-auto text-xl font-serif">
            {user.name.charAt(0)}
          </div>
          <div>
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block mb-1">
              PATRON PROFILE ACTIVE
            </span>
            <h1 className="font-serif text-3xl text-[#1a1c18]">{user.name}</h1>
            <p className="text-xs text-[#1a1c18]/60 font-mono mt-1">{user.email}</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[rgba(26,28,24,0.08)] space-y-3 text-xs">
            <button
              onClick={() => navigate('/account/orders')}
              className="w-full py-3 px-4 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full font-medium transition-colors"
            >
              View Order History & Invoices
            </button>
            <button
              onClick={() => navigate('/wishlist')}
              className="w-full py-2.5 px-4 border border-[rgba(26,28,24,0.18)] hover:bg-[#f2f2ef] rounded-full font-medium transition-colors"
            >
              Saved Formulations
            </button>
            <button
              onClick={() => {
                logout();
                addToast('You have been signed out safely', 'info');
              }}
              className="w-full py-2 text-[#1a1c18]/50 hover:text-red-700 underline text-[11px]"
            >
              Sign Out of Dispensary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 sm:py-24">
      <div className="kanva-container max-w-md">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block">
            PATRON ACCESS PORTAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal">
            Sign In to Riyansh
          </h1>
          <p className="text-xs text-[#1a1c18]/60 font-body">
            Access saved Ayurvedic regimens, order tracking, and patron discounts.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-5">
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleAuth}
            className="w-full py-3 px-4 bg-[#f2f2ef] hover:bg-[#e8e8e1] text-[#1a1c18] border border-[rgba(26,28,24,0.12)] rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-2.5"
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

          <div className="flex items-center gap-3 text-xs text-[#1a1c18]/30">
            <div className="flex-1 h-px bg-black/10" />
            <span className="font-mono text-[10px] uppercase">Or via Email</span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@example.com"
                className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast('Password reset link dispatched to your inbox', 'info'); }} className="text-[10px] text-[#757d5c] hover:underline">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors shadow-xs"
            >
              Sign In to Patron Portal
            </button>
          </form>

          <div className="pt-3 border-t border-[rgba(26,28,24,0.06)] text-center text-xs text-[#1a1c18]/60">
            <span>New to Riyansh Amrit? </span>
            <Link to="/signup" className="text-[#3c4433] font-medium hover:underline">
              Create Patron Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const { loginWithEmail, addToast } = useCommerce();
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
    loginWithEmail(email, password);
    addToast(`Welcome to Riyansh Amrit, ${name}!`, 'success');
    navigate('/store');
  };

  return (
    <div className="w-full py-16 sm:py-24">
      <div className="kanva-container max-w-md">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#757d5c] font-semibold block">
            BECOME AN AYURVEDIC PATRON
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c18] font-normal">
            Create an Account
          </h1>
          <p className="text-xs text-[#1a1c18]/60 font-body">
            Receive complimentary Ayurvedic dosage consultation and patron benefits.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[rgba(26,28,24,0.08)] shadow-xs space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Vaidya Sunita Joshi"
                className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sunita@example.com"
                className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a1c18]/70 block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2.5 bg-[#f2f2ef] border border-[rgba(26,28,24,0.12)] rounded-xl text-xs text-[#1a1c18] focus:outline-none focus:border-[#3c4433]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1a1c18] hover:bg-[#3c4433] text-white rounded-full text-xs font-medium transition-colors shadow-xs"
            >
              Complete Registration
            </button>
          </form>

          <div className="pt-3 border-t border-[rgba(26,28,24,0.06)] text-center text-xs text-[#1a1c18]/60">
            <span>Already have an account? </span>
            <Link to="/login" className="text-[#3c4433] font-medium hover:underline">
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
    navigate('/account/orders');
  }, [loginWithGoogle, navigate]);

  return (
    <div className="w-full py-24 text-center">
      <p className="text-xs font-mono text-[#1a1c18]/60">Completing Google Authentication...</p>
    </div>
  );
};
