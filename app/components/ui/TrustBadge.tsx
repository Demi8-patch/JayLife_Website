interface TrustBadgeProps {
    icon?: React.ReactNode;
    label: string;
    subLabel?: string;
    className?: string;
}

export function TrustBadge({ icon, label, subLabel, className = '' }: TrustBadgeProps) {
    return (
        <div className={`flex flex-col items-center text-center p-4 border border-brand-navy/5 rounded-xl bg-white/50 ${className}`}>
            {icon && <div className="text-brand-sage mb-2">{icon}</div>}
            <div className="font-display font-bold text-brand-navy text-sm">{label}</div>
            {subLabel && <div className="text-xs text-brand-navy/60 mt-1">{subLabel}</div>}
        </div>
    );
}
