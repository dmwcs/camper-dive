export function Pulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-charcoal/[0.06] ${className}`}
    />
  );
}
