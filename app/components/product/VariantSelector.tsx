import type { Variant } from '~/lib/mock-data';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelect: (variant: Variant) => void;
  label?: string;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
  label = 'Select Option',
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-warm-sunrise-charcoal">{label}</span>
        {selectedVariant && (
          <span className="text-sm text-warm-sunrise-charcoal/60">
            Selected: <span className="font-medium">{selectedVariant.name}</span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3" role="group" aria-label={label}>
        {variants.map((variant) => {
          const isSelected = selectedVariant?.name === variant.name;
          const isAvailable = variant.available !== false;

          return (
            <button
              key={variant.name}
              type="button"
              onClick={() => isAvailable && onSelect(variant)}
              disabled={!isAvailable}
              aria-pressed={isSelected}
              aria-disabled={!isAvailable}
              className={`
                variant-btn
                px-5 py-3 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  isSelected
                    ? 'bg-warm-sunrise-lime text-warm-sunrise-charcoal border-2 border-warm-sunrise-lime focus:ring-warm-sunrise-lime'
                    : isAvailable
                      ? 'bg-white text-warm-sunrise-charcoal border-2 border-warm-sunrise-charcoal/10 hover:border-warm-sunrise-charcoal/30 focus:ring-warm-sunrise-lime'
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed line-through'
                }
              `}
            >
              {variant.name}
              {variant.priceModifier && variant.priceModifier !== 0 && (
                <span className="ml-1 text-xs opacity-70">
                  ({variant.priceModifier > 0 ? '+' : ''}
                  {variant.priceModifier})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
