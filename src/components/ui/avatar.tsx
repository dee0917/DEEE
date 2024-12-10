import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  className?: string;
}

export const Avatar = ({ src, alt, className, ...props }: AvatarProps) => {
  return (
    <div
      className={cn(
        'relative inline-block rounded-full overflow-hidden',
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="object-cover"
      />
    </div>
  );
}; 