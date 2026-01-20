import { useState } from 'react';
import { DeliveryIcon, CheckIcon } from '~/components/ui/Icons';

interface DeliveryEstimateProps {
  deliveryDays?: number;
  className?: string;
}

export function DeliveryEstimate({ deliveryDays = 3, className = '' }: DeliveryEstimateProps) {
  const [zipCode, setZipCode] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [estimatedDate, setEstimatedDate] = useState<string | null>(null);

  const handleCheck = () => {
    if (zipCode.length >= 5) {
      // Mock delivery date calculation
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + deliveryDays);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      };
      setEstimatedDate(deliveryDate.toLocaleDateString('en-US', options));
      setIsChecked(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className={`bg-brand-cream/50 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <DeliveryIcon className="w-5 h-5 text-brand-navy" />
        <span className="font-bold text-brand-navy text-sm">Delivery Estimate</span>
      </div>

      {!isChecked ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            onKeyPress={handleKeyPress}
            placeholder="Enter ZIP code"
            className="flex-1 px-4 py-2.5 rounded-lg border border-brand-navy/10 text-sm focus:outline-none focus:border-electric-lime"
          />
          <button
            type="button"
            onClick={handleCheck}
            disabled={zipCode.length < 5}
            className="px-4 py-2.5 bg-brand-navy text-white rounded-lg text-sm font-bold hover:bg-brand-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-electric-lime/20 rounded-full flex items-center justify-center">
            <CheckIcon className="w-4 h-4 text-electric-lime" />
          </div>
          <div>
            <p className="text-sm text-brand-navy">
              Estimated delivery to <span className="font-bold">{zipCode}</span>
            </p>
            <p className="text-lg font-bold text-brand-navy">{estimatedDate}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsChecked(false);
              setZipCode('');
              setEstimatedDate(null);
            }}
            className="ml-auto text-xs text-brand-navy/60 hover:text-brand-navy underline"
          >
            Change
          </button>
        </div>
      )}

      <p className="text-xs text-brand-navy/50 mt-3">
        Free shipping on orders over $50 • Express shipping available
      </p>
    </div>
  );
}
