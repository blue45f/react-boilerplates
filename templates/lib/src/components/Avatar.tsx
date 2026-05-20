import { forwardRef, useState } from 'react';
import type { HTMLAttributes } from 'react';

import { cn } from '../utils/cn';
import styles from './Avatar.module.css';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** 이미지가 없거나 실패했을 때 표시할 이름(이니셜로 변환) */
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

function getInitials(name?: string) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0] ?? '').join('') || '?';
}

/** 이미지 + 이름 fallback을 지원하는 아바타 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, size = 'md', className, ...props },
  ref
) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;
  return (
    <span ref={ref} className={cn(styles.avatar, styles[size], className)} {...props}>
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt={alt ?? name ?? ''}
          onError={() => setErrored(true)}
        />
      ) : (
        <span aria-label={name}>{getInitials(name)}</span>
      )}
    </span>
  );
});
