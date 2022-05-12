type Props = {
  className: string;
};

export default function Secure(props: Props) {
  return (
    <svg
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="21" cy="21" r="21" fill="#ECEBFA" />
      <path
        d="M26 20H16C14.8954 20 14 20.8954 14 22V28C14 29.1046 14.8954 30 16 30H26C27.1046 30 28 29.1046 28 28V22C28 20.8954 27.1046 20 26 20Z"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 26C21.5523 26 22 25.5523 22 25C22 24.4477 21.5523 24 21 24C20.4477 24 20 24.4477 20 25C20 25.5523 20.4477 26 21 26Z"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 20V16C17 14.9391 17.4214 13.9217 18.1716 13.1716C18.9217 12.4214 19.9391 12 21 12C22.0609 12 23.0783 12.4214 23.8284 13.1716C24.5786 13.9217 25 14.9391 25 16V20"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
