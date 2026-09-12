'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LiveConsole() {
  const [currentTime, setCurrentTime] = useState('');
  const [power, setPower] = useState(380);
  const [heartRate, setHeartRate] = useState(174);
  const [speed, setSpeed] = useState(42.5);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0] + '.' + Math.floor(now.getMilliseconds() / 100));
      setPower(Math.floor(350 + Math.random() * 95));
      setHeartRate(Math.floor(170 + Math.random() * 12));
      setSpeed(Number((39 + Math.random() * 8).toFixed(1)));
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#080B08] border-y border-[#C3F84A]/30 py-4 px-6 md:px-16 font-mono text-xs text-gray-300 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C3F84A] animate-ping" />
          <span className="text-[#C3F84A] font-bold tracking-widest uppercase">
            LIVE TELEMETRY // SH_15
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">{currentTime} UTC</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 uppercase text-[10px]">POWER:</span>
            <motion.span key={power} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className="text-white font-bold tracking-wider">
              {power} W
            </motion.span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 uppercase text-[10px]">HEART RATE:</span>
            <motion.span key={heartRate} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className="text-[#C3F84A] font-bold tracking-wider">
              {heartRate} BPM ❤️
            </motion.span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 uppercase text-[10px]">SPEED:</span>
            <motion.span key={speed} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className="text-white font-bold tracking-wider">
              {speed} KM/H
            </motion.span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-right">
          <span className="bg-[#C3F84A]/10 border border-[#C3F84A]/30 text-[#C3F84A] px-3 py-1 rounded-md text-[10px] tracking-widest uppercase font-bold">
            STATUS: ATTACKING
          </span>
        </div>

      </div>
    </div>
  );
}