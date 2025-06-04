
import { Shield, AlertTriangle } from "lucide-react";

const Blocked = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2300"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Icon container with animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-red-400 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-red-400 via-pink-400 to-red-500 bg-clip-text text-transparent">
          Access Restricted
        </h1>

        <div className="flex items-center justify-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          <p className="text-white/80 !mb-0 text-sm font-medium tracking-wide">
            Account Temporarily Suspended
          </p>
        </div>

        <div className="text-center mb-8">
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            Your account access has been temporarily restricted by our security team.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            This action was taken to protect our platform and ensure the safety of all users.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/50 text-xs text-center leading-relaxed">
            If you believe this restriction was applied in error, our support team is available 24/7 to assist you.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Blocked;