import React from "react";

type Props = {
  className: string;
};

export default function Video(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"></path>
      <rect x="3" y="6" width="12" height="12" rx="2"></rect>
      <line x1="7" y1="12" x2="11" y2="12"></line>
      <line x1="9" y1="10" x2="9" y2="14"></line>
    </svg>
  );
}
