import logoImg from '../assets/logo.png';

const SIZES = {
  sm: { img: 'w-8 h-8', text: 'text-lg' },
  md: { img: 'w-10 h-10', text: 'text-xl' },
  lg: { img: 'w-12 h-12', text: 'text-2xl' },
};

export default function BrandLogo({ size = 'md', showTagline = false, className = '' }) {
  const styles = SIZES[size] || SIZES.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoImg}
        alt="Olive ifixit logo"
        className={`${styles.img} rounded-xl object-contain shrink-0`}
      />
      <div className="flex flex-col">
        <span className={`${styles.text} font-extrabold tracking-tight text-white`}>
          Olive <span className="text-brand-gold">ifixit</span>
        </span>
        {showTagline && (
          <span className="text-[10px] text-gray-500 font-medium -mt-1">
            Express Mobile Repairs
          </span>
        )}
      </div>
    </div>
  );
}
