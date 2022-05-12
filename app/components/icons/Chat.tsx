type Props = {
  className: string;
};

export default function Chat(props: Props) {
  return (
    <svg
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="21" cy="21" r="21" fill="#ECEBFA" />
      <path
        d="M13 30V17C13 16.2044 13.3161 15.4413 13.8787 14.8787C14.4413 14.3161 15.2044 14 16 14H26C26.7956 14 27.5587 14.3161 28.1213 14.8787C28.6839 15.4413 29 16.2044 29 17V23C29 23.7956 28.6839 24.5587 28.1213 25.1213C27.5587 25.6839 26.7956 26 26 26H17L13 30Z"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 20V20.01"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 20V20.01"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25 20V20.01"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
