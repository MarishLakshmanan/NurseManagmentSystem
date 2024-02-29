import { useTheme } from "@emotion/react";

export default function Container({ children }) {
  const theme = useTheme();

  return (
    <div
      style={{ backgroundColor: theme.palette.primary.light }}
      className="container"
    >
      {children}
    </div>
  );
}
