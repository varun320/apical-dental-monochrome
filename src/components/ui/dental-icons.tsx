interface DentalIconProps {
  size?: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

const defaults = {
  primaryColor: "var(--cyan)",
  secondaryColor: "var(--mint)",
};

export function ToothIcon({
  size = 80,
  className = "",
  primaryColor = defaults.primaryColor,
  secondaryColor = defaults.secondaryColor,
}: DentalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <path
        d="M20 4C14 4 10 8 10 14c0 4 1 8 2.5 12 1.5 4 3 8 4.5 10h6c1.5-2 3-6 4.5-10C29 22 30 18 30 14c0-6-4-10-10-10z"
        fill={primaryColor}
        opacity={0.15}
      />
      <path
        d="M20 4C14 4 10 8 10 14c0 4 1 8 2.5 12 1.5 4 3 8 4.5 10h6c1.5-2 3-6 4.5-10C29 22 30 18 30 14c0-6-4-10-10-10z"
        stroke={primaryColor}
        strokeWidth={1.5}
        fill="none"
      />
      <path
        d="M14 14c2-2 4-2 6 0s4 2 6 0"
        stroke={secondaryColor}
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function MolarIcon({
  size = 80,
  className = "",
  primaryColor = defaults.primaryColor,
  secondaryColor = defaults.secondaryColor,
}: DentalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <path
        d="M8 16c0-5 3-10 8-10 2 0 3 1 4 1s2-1 4-1c5 0 8 5 8 10 0 4-1 8-2 12-1 3-2 6-4 6h-2c-1 0-2-2-3-2s-2 2-3 2h-2c-2 0-3-3-4-6-1-4-2-8-2-12z"
        fill={primaryColor}
        opacity={0.15}
      />
      <path
        d="M8 16c0-5 3-10 8-10 2 0 3 1 4 1s2-1 4-1c5 0 8 5 8 10 0 4-1 8-2 12-1 3-2 6-4 6h-2c-1 0-2-2-3-2s-2 2-3 2h-2c-2 0-3-3-4-6-1-4-2-8-2-12z"
        stroke={primaryColor}
        strokeWidth={1.5}
        fill="none"
      />
      <circle cx="16" cy="14" r="2" fill={secondaryColor} opacity={0.4} />
      <circle cx="24" cy="14" r="2" fill={secondaryColor} opacity={0.4} />
    </svg>
  );
}

export function DentalMirrorIcon({
  size = 80,
  className = "",
  primaryColor = defaults.primaryColor,
  secondaryColor = defaults.secondaryColor,
}: DentalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <circle
        cx="20"
        cy="12"
        r="8"
        fill={primaryColor}
        opacity={0.12}
      />
      <circle
        cx="20"
        cy="12"
        r="8"
        stroke={primaryColor}
        strokeWidth={1.5}
        fill="none"
      />
      <ellipse
        cx="20"
        cy="11"
        rx="4"
        ry="3"
        fill={secondaryColor}
        opacity={0.2}
      />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="38"
        stroke={primaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SmileCurveIcon({
  size = 80,
  className = "",
  primaryColor = defaults.primaryColor,
  secondaryColor = defaults.secondaryColor,
}: DentalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <path
        d="M6 18c4 10 24 10 28 0"
        stroke={primaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      {/* Individual teeth along the smile */}
      <rect x="11" y="16" width="3" height="5" rx="1" fill={secondaryColor} opacity={0.3} />
      <rect x="15" y="15" width="3" height="6" rx="1" fill={primaryColor} opacity={0.15} />
      <rect x="19" y="15" width="3" height="6" rx="1" fill={primaryColor} opacity={0.15} />
      <rect x="23" y="15" width="3" height="6" rx="1" fill={primaryColor} opacity={0.15} />
      <rect x="27" y="16" width="3" height="5" rx="1" fill={secondaryColor} opacity={0.3} />
    </svg>
  );
}

export function JawOutlineIcon({
  size = 80,
  className = "",
  primaryColor = defaults.primaryColor,
  secondaryColor = defaults.secondaryColor,
}: DentalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <path
        d="M6 10c0 0 2 20 14 20S34 10 34 10"
        stroke={primaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 12c1 8 4 14 10 14s9-6 10-14"
        fill={primaryColor}
        opacity={0.08}
      />
      {/* Tooth markers */}
      <circle cx="12" cy="14" r="1.5" fill={secondaryColor} opacity={0.5} />
      <circle cx="17" cy="12" r="1.5" fill={secondaryColor} opacity={0.5} />
      <circle cx="23" cy="12" r="1.5" fill={secondaryColor} opacity={0.5} />
      <circle cx="28" cy="14" r="1.5" fill={secondaryColor} opacity={0.5} />
    </svg>
  );
}

export function ScannerIcon({
  size = 80,
  className = "",
  primaryColor = defaults.primaryColor,
  secondaryColor = defaults.secondaryColor,
}: DentalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      {/* Scanner body */}
      <rect
        x="14"
        y="4"
        width="12"
        height="24"
        rx="6"
        stroke={primaryColor}
        strokeWidth={1.5}
        fill="none"
      />
      <rect
        x="14"
        y="4"
        width="12"
        height="24"
        rx="6"
        fill={primaryColor}
        opacity={0.1}
      />
      {/* Scan beam */}
      <path
        d="M16 28l-4 8h16l-4-8"
        stroke={secondaryColor}
        strokeWidth={1.2}
        fill={secondaryColor}
        opacity={0.15}
      />
      {/* Lens */}
      <circle cx="20" cy="14" r="4" stroke={secondaryColor} strokeWidth={1.2} fill="none" />
      <circle cx="20" cy="14" r="1.5" fill={primaryColor} opacity={0.4} />
    </svg>
  );
}
