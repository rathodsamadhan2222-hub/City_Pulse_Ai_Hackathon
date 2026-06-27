import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = false, delay = 0, animate = false, ...props }) {
  const Component = animate ? motion.div : 'div';
  const animateProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, delay, ease: 'easeOut' },
  } : {};

  const hoverProps = hover ? {
    whileHover: { y: -4, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)' },
    transition: { type: 'spring', stiffness: 300 },
  } : {};

  return (
    <Component
      className={`glass-card ${className}`}
      {...animateProps}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
}
