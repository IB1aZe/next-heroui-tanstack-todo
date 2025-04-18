import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
