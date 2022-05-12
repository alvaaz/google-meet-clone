type Props = {
  className: string;
};

export default function Screen(props: Props) {
  return (
    <svg
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="21" cy="21" r="21" fill="#ECEBFA" />
      <path
        d="M30 21V24C30 24.2652 29.8946 24.5196 29.7071 24.7071C29.5196 24.8946 29.2652 25 29 25H13C12.7348 25 12.4804 24.8946 12.2929 24.7071C12.1054 24.5196 12 24.2652 12 24V14C12 13.7348 12.1054 13.4804 12.2929 13.2929C12.4804 13.1054 12.7348 13 13 13H22"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 29H26"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 25V29"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24 25V29"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26 13H30V17"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25 18L30 13"
        stroke="#4338CA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
