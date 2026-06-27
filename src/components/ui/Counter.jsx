import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function Counter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Parse target number and suffix (e.g. "32%" -> { number: 32, suffix: "%" }, "4.8M" -> { number: 4.8, suffix: "M" })
  const { targetNumber, suffix, isFloat } = React.useMemo(() => {
    const numRegex = /([0-9.]+)/;
    const match = String(value).match(numRegex);
    if (!match) return { targetNumber: 0, suffix: String(value), isFloat: false };
    
    const numStr = match[1];
    const suffixStr = String(value).replace(numStr, '');
    const num = parseFloat(numStr);
    
    return {
      targetNumber: num,
      suffix: suffixStr,
      isFloat: numStr.includes('.'),
    };
  }, [value]);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = targetNumber;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = 30; // 33 fps approx
    const totalSteps = totalMiliseconds / incrementTime;
    const stepIncrement = (end - start) / totalSteps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = start + stepIncrement * currentStep;
      
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(nextValue);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, targetNumber, duration]);

  const formattedCount = isFloat 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {formattedCount}
      {suffix}
    </span>
  );
}
