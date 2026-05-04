import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginComponent() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-black text-black mb-6 uppercase tracking-widest text-center">Bon Retour</h1>
        
        <form className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-gray-200 text-black rounded-xl px-4 py-3 focus:outline-none focus:border-purple-600 transition-all font-bold"
          />
          <button className="w-full bg-black text-white font-black py-4 rounded-xl hover:bg-gray-900 transition-all uppercase tracking-widest">
            Se connecter
          </button>
        </form>

        <p className="text-center mt-8 text-black/40 text-sm font-bold">
           NOUVEAU ? <Link to="/signup" className="text-purple-600 hover:underline ml-2">CRÉER UN COMPTE</Link>
        </p>

        <Link to="/" className="block text-center mt-8 text-black/20 hover:text-black transition-colors text-xs font-black uppercase tracking-widest">
          ← Retour au site
        </Link>
      </div>
    </div>
  );
}
