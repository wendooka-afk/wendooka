import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const RotatingText: React.FC = () => {
  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
        <defs>
          <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text dy="5">
          <textPath xlinkHref="#circle" className="font-bold text-sm uppercase tracking-widest" fill="white">
            • HIRE US • HIRE US • HIRE US
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-lime-accent rounded-full flex items-center justify-center">
           <ArrowUpRight className="h-8 w-8 text-dark-black" />
        </div>
      </div>
    </div>
  );
};

export default RotatingText;