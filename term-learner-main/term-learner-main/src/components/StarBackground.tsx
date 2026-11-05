
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: number;
  left: number;
  opacity: number;
  duration: number;
}

export const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          opacity: 0.2 + Math.random() * 0.8,
          duration: 1.5 + Math.random() * 2.5,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
