type Props = {
  className: string;
};

export default function Rooms(props: Props) {
  return (
    <svg
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="21" cy="21" r="21" fill="#ECEBFA" />
      <path
        d="M24 19L28.553 16.724C28.7054 16.6478 28.8748 16.6119 29.045 16.6195C29.2152 16.6272 29.3806 16.6782 29.5256 16.7678C29.6706 16.8574 29.7902 16.9825 29.8733 17.1313C29.9563 17.2801 29.9999 17.4476 30 17.618V24.382C29.9999 24.5524 29.9563 24.7199 29.8733 24.8687C29.7902 25.0175 29.6706 25.1426 29.5256 25.2322C29.3806 25.3218 29.2152 25.3728 29.045 25.3805C28.8748 25.3881 28.7054 25.3522 28.553 25.276L24 23V19Z"
        stroke="#4338CA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 15H14C12.8954 15 12 15.8954 12 17V25C12 26.1046 12.8954 27 14 27H22C23.1046 27 24 26.1046 24 25V17C24 15.8954 23.1046 15 22 15Z"
        stroke="#4338CA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21H20"
        stroke="#4338CA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 19V23"
        stroke="#4338CA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
