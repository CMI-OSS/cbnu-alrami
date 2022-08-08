import { IconProps } from "src/type/props";

function Map({ size, stroke }: IconProps) {
  return (
    <svg
      width={size}
      height="auto"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.15599 8.24212C9.84282 7.34626 10.1681 6.23252 10.0692 5.11524C9.97036 3.99795 9.45433 2.95605 8.62044 2.19003C7.83375 1.42752 6.77301 1 5.66782 1C4.56263 1 3.50189 1.42752 2.7152 2.19003C1.88296 2.95721 1.36848 3.9993 1.27052 5.11628C1.17255 6.23325 1.498 7.34642 2.1844 8.24212L5.66782 13L9.15599 8.24212Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.60151 6.98976C6.56474 6.98976 7.3456 6.22271 7.3456 5.2765C7.3456 4.33029 6.56474 3.56323 5.60151 3.56323C4.63828 3.56323 3.85742 4.33029 3.85742 5.2765C3.85742 6.22271 4.63828 6.98976 5.60151 6.98976Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Map };
