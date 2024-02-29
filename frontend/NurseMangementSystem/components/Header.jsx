import { useTheme } from "@emotion/react";

export default function Header() {
  const theme = useTheme();
  return (
    <div style={{ color: theme.palette.text.primary }} className="header">
      <h2>NURSE MANAGEMENT SYSTEM</h2>
    </div>
  );
}
