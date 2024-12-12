import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-white shadow-lg rounded-xl border border-gray-100', className)}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn('px-8 py-6 border-b border-gray-100', className)}>
      {children}
    </div>
  );
};

Card.Content = function CardContent({ children, className }: CardProps) {
  return <div className={cn('px-8 py-6', className)}>{children}</div>;
};