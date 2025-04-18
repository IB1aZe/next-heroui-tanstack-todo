import { IconSvgProps } from "@/types";

export const EditIcons = (props: IconSvgProps) => {
  const { size = 24, ...rest } = props;

  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M4 20V22H20V20H4ZM17.71 4.29C17.32 3.9 16.68 3.9 16.29 4.29L14.59 6L17.71 9.12L19.41 7.41C19.8 7.02 19.8 6.38 19.41 6L17.71 4.29ZM12.41 8L10.71 6.29L3.59 13.41C3.21 13.79 3 14.34 3 15V18C3 18.55 3.45 19 4 19H7C7.66 19 8.21 18.79 8.59 18.41L15.71 11L12.41 8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DeleteIcons = (props: IconSvgProps) => {
  const { size = 24, ...rest } = props;

  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M19 6H5V4H7V2H17V4H19V6ZM5 8H19C20.1 8 21 8.9 21 10V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V10C3 8.9 3.9 8 5 8ZM5 10V20H19V10H5Z"
        fill="currentColor"
      />
    </svg>
  );
};
