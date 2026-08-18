import logoImg from '../assets/logo.png';

const SIZES = {
  sm: { img: 'h-8 w-auto', text: 'text-lg' },
  md: { img: 'h-11 w-auto', text: 'text-xl' },
  lg: { img: 'h-14 sm:h-16 w-auto', text: 'text-2xl sm:text-[1.7rem]' },
};

const MARK_SIZES = {
  sm: 'h-6 w-auto',
  md: 'h-8 w-auto',
  lg: 'h-10 w-auto',
  xl: 'h-24 sm:h-32 lg:h-40 w-auto',
};

export function BrandMark({ size = 'md', className = '' }) {
  const imgSize = MARK_SIZES[size] || MARK_SIZES.md;

  return (
    <img
      src={logoImg}
      alt=""
      className={`${imgSize} object-contain shrink-0 drop-shadow-[0_0_18px_rgba(212,175,55,0.45)] ${className}`}
    />
  );
}

export default function BrandLogo({ size = 'md', showTagline = false, className = '' }) {
  const styles = SIZES[size] || SIZES.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoImg}
        alt="Olive ifixit logo"
        className={`${styles.img} object-contain shrink-0 drop-shadow-[0_0_18px_rgba(212,175,55,0.45)]`}
      />
      <div className="flex flex-col leading-none">
        <span className={`${styles.text} font-extrabold tracking-tight text-white`}>
          Olive <span className="text-brand-gold">ifixit</span>
        </span>
        {showTagline && (
          <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium mt-1">
            Premium Apple Repairs
          </span>
        )}
      </div>
    </div>
  );
}
