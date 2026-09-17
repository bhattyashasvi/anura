import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Building, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { CommunityEvent } from '../types';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CommunityEvent | null;
  onPaymentSuccess: (eventId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  event,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'bhim' | 'gpay' | 'phonepe' | 'card' | 'netbanking'>('gpay');
  const [step, setStep] = useState<'methods' | 'processing' | 'success'>('methods');

  if (!isOpen || !event) return null;

  const handlePayNow = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onPaymentSuccess(event.id);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F26B3B', '#AEE1F9', '#121942']
        });
      } catch {
        // ignore
      }
    }, 1800);
  };

  const handleFinish = () => {
    setStep('methods');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        {step !== 'processing' && (
          <button
            onClick={handleFinish}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[#121942] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {step === 'methods' && (
          <div>
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F26B3B]">
                Secure Booking
              </span>
              <h2 className="text-xl font-extrabold text-[#121942]">Method of Payment</h2>
              <p className="text-xs text-gray-500 mt-1">
                Booking: <span className="font-semibold text-[#121942]">{event.title}</span>
              </p>
            </div>

            {/* Event Summary Ticket */}
            <div className="p-3.5 rounded-2xl bg-[#E7F6FE]/70 border border-[#AEE1F9]/60 mb-5">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Registration Fee (1 Child + 1 Parent):</span>
                <span className="text-base font-extrabold text-[#121942]">
                  {event.price === 0 ? 'FREE' : event.priceFormatted}
                </span>
              </div>
              <div className="text-[11px] text-gray-500">
                {event.date} • {event.time}
              </div>
            </div>

            {/* Payment Options (Direct from Case Study screens) */}
            <div className="space-y-3 mb-6">
              {/* UPI */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  UPI Options
                </span>
                <div className="space-y-1.5">
                  {[
                    { id: 'gpay', label: 'Google Pay UPI', desc: 'Instant 1-tap checkout' },
                    { id: 'phonepe', label: 'PhonePe UPI', desc: 'Secure payment app' },
                    { id: 'bhim', label: 'BHIM UPI', desc: 'Govt. verified interface' }
                  ].map((item) => (
                    <label
                      key={item.id}
                      onClick={() => setSelectedMethod(item.id as any)}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                        selectedMethod === item.id
                          ? 'border-[#121942] bg-[#F8FBFE] shadow-xs'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-[#121942]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#121942]">{item.label}</div>
                          <div className="text-[10px] text-gray-500">{item.desc}</div>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedMethod === item.id}
                        onChange={() => setSelectedMethod(item.id as any)}
                        className="w-4 h-4 text-[#121942] accent-[#121942]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Cards */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Cards
                </span>
                <label
                  onClick={() => setSelectedMethod('card')}
                  className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedMethod === 'card'
                      ? 'border-[#121942] bg-[#F8FBFE] shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-[#121942]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#121942]">Add credit or debit cards</div>
                      <div className="text-[10px] text-gray-500">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedMethod === 'card'}
                    onChange={() => setSelectedMethod('card')}
                    className="w-4 h-4 text-[#121942] accent-[#121942]"
                  />
                </label>
              </div>

              {/* Netbanking */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Other
                </span>
                <label
                  onClick={() => setSelectedMethod('netbanking')}
                  className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedMethod === 'netbanking'
                      ? 'border-[#121942] bg-[#F8FBFE] shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                      <Building className="w-4 h-4 text-[#121942]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#121942]">Netbanking</div>
                      <div className="text-[10px] text-gray-500">All major Indian banks</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedMethod === 'netbanking'}
                    onChange={() => setSelectedMethod('netbanking')}
                    className="w-4 h-4 text-[#121942] accent-[#121942]"
                  />
                </label>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              className="w-full py-3.5 rounded-2xl bg-[#121942] hover:bg-[#1a235c] text-white text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{event.price === 0 ? 'Confirm Free Registration' : `Pay ${event.priceFormatted} Now`}</span>
              <ArrowRight className="w-4 h-4 text-[#AEE1F9]" />
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-[#E7F6FE] border-t-[#F26B3B] animate-spin flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#121942]" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#121942] mb-1">Authorizing with Bank...</h3>
            <p className="text-xs text-gray-500 max-w-xs">
              Encrypting transaction for {event.title}. Please do not close or reload this window.
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-18 h-18 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              Confirmed
            </span>
            <h2 className="text-2xl font-black text-[#121942] tracking-tight mb-2">
              Payment was successful!
            </h2>

            <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-[#D4E3ED] text-left text-xs text-gray-600 mb-6 space-y-2">
              <p className="leading-relaxed">
                You’ve successfully booked <strong className="text-[#121942]">{event.title}</strong> for{' '}
                <strong className="text-[#121942]">{event.date}</strong>.
              </p>
              <p className="text-gray-500">
                Location: <strong className="text-[#121942]">{event.location}</strong>
              </p>
              <div className="pt-2 border-t border-gray-200 flex items-center gap-1.5 text-[#121942] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#F26B3B]" />
                <span>We can’t wait to see you and your little one! A reminder will be sent 24h prior.</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-2xl bg-[#121942] hover:bg-[#1a235c] text-white text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
