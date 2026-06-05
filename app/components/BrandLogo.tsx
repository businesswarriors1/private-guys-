interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 361 108"
      role="img"
      aria-label="Private Guys Australia"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <circle cx="34" cy="14" r="8" />
        <path d="M28 25c2-4 9-4 12 0l5 17 9 11-5 5-10-10-5-11-6 16 10 17-6 6-13-19 5-21z" />
        <path d="M25 55l-8 18 7 3 9-18z" />
        <path d="M43 64l9 18 7-3-8-19z" />
        <path d="M19 77l-10 14 7 4 12-16z" />
        <path d="M52 80l4 17 8-2-4-18z" />
        <path d="M19 34l-12 4 2 7 14-3z" />
      </g>

      <g fill="currentColor">
        <text
          x="82"
          y="45"
          style={{
            fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
            fontSize: 37,
            letterSpacing: 0.5,
          }}
        >
          PRIVATE GUYS
        </text>
        <text
          x="119"
          y="72"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 14,
          }}
        >
          AUSTRALIA
        </text>
        <rect x="0" y="94" width="361" height="3" />
      </g>

      <g fill="#050505" opacity="0.72">
        <circle cx="98" cy="31" r="1.8" />
        <circle cx="132" cy="52" r="1.5" />
        <circle cx="173" cy="36" r="1.7" />
        <circle cx="216" cy="54" r="1.5" />
        <circle cx="267" cy="35" r="1.8" />
        <circle cx="312" cy="53" r="1.5" />
        <rect x="142" y="58" width="9" height="2.5" transform="rotate(-12 142 58)" />
        <rect x="242" y="28" width="8" height="2.3" transform="rotate(16 242 28)" />
        <rect x="294" y="63" width="7" height="2.2" transform="rotate(-10 294 63)" />
      </g>
    </svg>
  );
}
