import React, { useState, useEffect } from 'react';
import { ShieldAlert, PhoneCall, CheckCircle2, X, AlertTriangle, MapPin, HeartPulse, User } from 'lucide-react';
import { EmergencyContact } from '../types';
import confetti from 'canvas-confetti';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose, contacts }) => {
  const [countdown, setCountdown] = useState<number>(3);
  const [stage, setStage] = useState<'countdown' | 'calling' | 'safe'>('countdown');
  const [activeContactIndex, setActiveContactIndex] = useState<number>(0);

  const primaryContact = contacts.find(c => c.isPrimary) || contacts[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setStage('countdown');
      setCountdown(3);

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStage('calling');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkSafe = () => {
    setStage('safe');
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#AEE1F9', '#48BB78', '#121942']
      });
    } catch {
      // Ignore if confetti fails
    }
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="sos-modal-card"
        className="relative w-full max-w-lg overflow-hidden bg-[#121942] border border-white/10 rounded-3xl text-white shadow-2xl text-center p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/80"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        {stage === 'countdown' && (
          <div className="flex flex-col items-center py-4">
            <div className="relative mb-6">
              {/* Outer pulsing ring */}
              <div className="w-28 h-28 rounded-full bg-[#F26B3B]/20 animate-ping absolute inset-0" />
              <div className="relative w-28 h-28 rounded-full border-4 border-[#F26B3B] bg-[#F26B3B]/10 flex items-center justify-center shadow-lg">
                <span className="text-5xl font-black text-[#F26B3B]">{countdown}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F26B3B]/20 text-[#F26B3B] text-xs font-semibold mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              EMERGENCY SOS TRIGGERED
            </div>

            <h2 className="text-2xl font-bold mb-2">Emergency Calling Initiating...</h2>
            <p className="text-white/70 text-sm max-w-sm mx-auto mb-6">
              Connecting automatically to your saved caregivers and specialists. Location coordinates will be broadcasted.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#AEE1F9] bg-white/5 py-2 px-4 rounded-xl mb-8">
              <MapPin className="w-4 h-4 text-[#AEE1F9]" />
              <span>Location shared: Satellite, Ahmedabad (Accuracy: 12m)</span>
            </div>

            <div className="w-full flex flex-col gap-3">
              <button
                id="sos-safe-button-early"
                onClick={handleMarkSafe}
                className="w-full py-3.5 px-6 rounded-2xl bg-white text-[#121942] font-bold text-base hover:bg-[#E7F6FE] transition-all shadow-md active:scale-95"
              >
                I am Safe (Cancel Call)
              </button>
            </div>
          </div>
        )}

        {stage === 'calling' && (
          <div className="flex flex-col items-center py-4">
            {/* Active Calling Animation */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-[#F26B3B]/30 animate-pulse flex items-center justify-center">
                <div className="w-18 h-18 rounded-full bg-[#F26B3B] flex items-center justify-center text-white shadow-xl">
                  <PhoneCall className="w-9 h-9 animate-bounce" />
                </div>
              </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-[#F26B3B] font-bold mb-1">
              Calling Now
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight mb-1 text-white">
              {primaryContact.name}
            </h2>
            <p className="text-[#AEE1F9] text-sm mb-6">
              {primaryContact.relation} • {primaryContact.phoneNumber}
            </p>

            {/* Simulated Live Call Status */}
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left mb-6">
              <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Ringing Line 1
                </span>
                <span>SMS Alert Sent</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                "Anura SOS Alert: Shweta is requesting urgent caregiver support for Vihaan. Tap to open live child health dashboard & map."
              </p>
            </div>

            {/* Quick Switch to Other Contacts */}
            <div className="w-full mb-6 text-left">
              <p className="text-xs text-white/60 mb-2 font-medium">Backup Emergency Line:</p>
              <div className="grid grid-cols-2 gap-2">
                {contacts.filter(c => !c.isPrimary).map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => alert(`Calling backup contact: ${contact.name} (${contact.phoneNumber})`)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-[#AEE1F9]" />
                    <div className="truncate">
                      <div className="font-semibold text-white truncate">{contact.name}</div>
                      <div className="text-[10px] text-white/60 truncate">{contact.relation}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* I am Safe Reassuring Button from Case Study */}
            <button
              id="sos-i-am-safe-button"
              onClick={handleMarkSafe}
              className="w-full py-4 px-6 rounded-2xl bg-[#F26B3B] hover:bg-[#e05b2c] text-white font-bold text-base transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-5 h-5" />
              I am Safe (End Emergency)
            </button>
          </div>
        )}

        {stage === 'safe' && (
          <div className="flex flex-col items-center py-8">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">You are Safe</h2>
            <p className="text-white/70 text-sm max-w-xs mx-auto mb-4">
              Emergency contacts have been notified that you and your child are safe and supported.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full">
              Status restored to Normal
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
