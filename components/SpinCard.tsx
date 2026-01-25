import React from 'react';

type CardVariant = 'yellow' | 'cyan' | 'purple' | 'green' | 'red';

interface SpinCardProps {
  title: string;
  subtitle?: string;
  variant: CardVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const VARIANTS = {
  yellow: { header: 'bg-[#FFF9C4]', text: 'text-yellow-800' },
  cyan: { header: 'bg-[#E0F7FA]', text: 'text-cyan-800' },
  purple: { header: 'bg-[#F3E5F5]', text: 'text-purple-800' },
  green: { header: 'bg-[#E8F5E9]', text: 'text-green-800' },
  red: { header: 'bg-[#FFEBEE]', text: 'text-red-800' },
};

export const SpinCard: React.FC<SpinCardProps> = ({ 
  title, 
  subtitle, 
  variant, 
  children, 
  icon, 
  className = '',
  action
}) => {
  const styles = VARIANTS[variant];

  return (
    <div className={`bg-white rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] overflow-hidden hover:scale-[1.01] transition-all duration-300 flex flex-col ${className}`}>
      {/* Header Section */}
      <div className={`${styles.header} p-6 pb-8 flex justify-between items-start relative`}>
        <div>
            <div className="flex items-center gap-3">
                {icon && <div className="p-2 bg-white/50 rounded-full backdrop-blur-sm">{icon}</div>}
                <div>
                    <h3 className={`font-bold text-xl ${styles.text}`}>{title}</h3>
                    {subtitle && <p className={`text-sm opacity-70 font-medium ${styles.text}`}>{subtitle}</p>}
                </div>
            </div>
        </div>
        {action && <div className="z-10">{action}</div>}
        
        {/* Decorative curve at bottom of header to blend into white */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-white rounded-t-[2rem]"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-0 flex-1 flex flex-col relative z-10">
        {children}
      </div>
    </div>
  );
};
