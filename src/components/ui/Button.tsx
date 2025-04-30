import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500/40 shadow-sm hover:shadow-md duration-300',
        secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-500/40 shadow-sm hover:shadow-md duration-300',
        outline: 'border-2 border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-surface-100 dark:hover:bg-surface-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 duration-200',
        accent: 'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500/40 shadow-sm hover:shadow-md duration-300',
        bright: 'bg-bright-500 text-white hover:bg-bright-600 focus-visible:ring-bright-500/40 shadow-sm hover:shadow-md duration-300',
        ghost: 'bg-transparent hover:bg-surface-200/70 dark:hover:bg-surface-800/70 text-neutral-700 dark:text-neutral-300 duration-200',
        link: 'bg-transparent underline-offset-4 hover:underline text-primary-600 dark:text-primary-400 p-0 h-auto hover:text-primary-700 dark:hover:text-primary-300 duration-200',
        gradient: 'bg-gradient-primary text-white hover:shadow-md hover:shadow-primary-500/30 focus-visible:ring-primary-500/40 shadow-sm duration-300',
        danger: 'bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500/40 shadow-sm hover:shadow-md duration-300',
        success: 'bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-500/40 shadow-sm hover:shadow-md duration-300',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 px-3 py-1 text-xs',
        lg: 'h-12 px-6 py-3 text-base',
        xl: 'h-14 px-8 py-4 text-lg',
        icon: 'h-10 w-10 p-2',
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full',
        sm: 'rounded-md',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, href, external, children, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={buttonVariants({ variant, size, rounded, className })}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </Link>
      );
    }
    
    return (
      <button
        className={buttonVariants({ variant, size, rounded, className })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 