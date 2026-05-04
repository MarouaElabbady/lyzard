import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../lib/LanguageContext';

export function PaymentModal({ isOpen, onClose, plan, isYearly }) {
  const { language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  const t = {
    fr: {
      checkout: "Paiement",
      plan: "Plan",
      total: "Total à payer",
      card: "Carte de crédit",
      pay: "Payer",
      processing: "Traitement en cours...",
      success: "Paiement réussi !",
      cancel: "Annuler",
      secure: "Paiement sécurisé",
      year: "an",
      month: "mois",
      cardNumber: "Numéro de carte",
      expiry: "MM/AA",
      cvc: "CVC",
      billed: isYearly ? "Facturé annuellement" : "Facturé mensuellement",
      thankYou: "Merci pour votre achat. Vous avez maintenant accès à toutes les fonctionnalités."
    },
    en: {
      checkout: "Checkout",
      plan: "Plan",
      total: "Total to pay",
      card: "Credit Card",
      pay: "Pay",
      processing: "Processing...",
      success: "Payment successful!",
      cancel: "Cancel",
      secure: "Secure payment",
      year: "year",
      month: "month",
      cardNumber: "Card Number",
      expiry: "MM/YY",
      cvc: "CVC",
      billed: isYearly ? "Billed yearly" : "Billed monthly",
      thankYou: "Thank you for your purchase. You now have access to all features."
    }
  }[language];

  const price = isYearly ? plan.yearlyPrice : plan.price;
  const period = isYearly ? t.year : t.month;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={!isProcessing ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black tracking-tight">{t.checkout}</h2>
                <p className="text-blue-200 mt-2 font-medium">{t.secure}</p>
              </div>
            </div>

            <div className="p-8">
              {!isSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Order Summary */}
                  <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center shadow-inner">
                    <div>
                      <h3 className="font-black text-slate-800 text-lg">{plan.name}</h3>
                      <p className="text-sm text-slate-500 font-medium mt-1">{t.billed}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-blue-600">{price} <span className="text-xl">DH</span></div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">/{period}</div>
                    </div>
                  </div>

                  <form onSubmit={handlePay} className="space-y-5">
                    {/* Card Info */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.cardNumber}</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            placeholder="0000 0000 0000 0000" 
                            className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-0 focus:border-blue-500 outline-none transition-colors font-medium text-slate-800 pl-14 shadow-sm"
                          />
                          <svg className="w-6 h-6 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.expiry}</label>
                          <input 
                            type="text" 
                            required
                            placeholder="MM/YY" 
                            className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-0 focus:border-blue-500 outline-none transition-colors font-medium text-slate-800 shadow-sm"
                          />
                        </div>
                        <div className="space-y-2 flex-1">
                          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.cvc}</label>
                          <input 
                            type="text" 
                            required
                            placeholder="123" 
                            className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-0 focus:border-blue-500 outline-none transition-colors font-medium text-slate-800 shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 transform hover:-translate-y-1"
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t.processing}
                          </>
                        ) : (
                          <>{t.pay} {price} DH</>
                        )}
                      </button>
                    </div>
                    
                    <button 
                      type="button"
                      onClick={onClose}
                      disabled={isProcessing}
                      className="w-full py-3 px-6 text-slate-500 hover:text-slate-800 font-bold transition-colors uppercase tracking-wider text-sm"
                    >
                      {t.cancel}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-6"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white mb-2 shadow-[0_10px_30px_rgba(16,185,129,0.4)]"
                  >
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 mb-2">{t.success}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed px-4">{t.thankYou}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
