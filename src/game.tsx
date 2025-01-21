import { ReactElement } from "react";

type gameProps = {
  children?: ReactElement;
};

export default function game(props: gameProps) {
  const { children } = props;

  return <main className="main">{children}</main>;
}
