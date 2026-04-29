import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CourseCountdown: React.FC = () => {
  const [days, setDays] = useState<string>("01");
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");
  const [seconds, setSeconds] = useState<string>("00");
  const [nextWorkshopDate, setNextWorkshopDate] = useState<Date>(new Date());

  useEffect(() => {
    // Calculate next workshop date (always next day at 7 PM IST)
    const calculateNextWorkshopDate = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Set time to 7 PM IST (UTC+5:30)
      tomorrow.setHours(19, 0, 0, 0);
      
      return tomorrow;
    };

    setNextWorkshopDate(calculateNextWorkshopDate());

    // Update countdown every second
    const interval = setInterval(() => {
      const now = new Date();
      const nextWorkshop = calculateNextWorkshopDate();
      const distance = nextWorkshop.getTime() - now.getTime();
      
      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Add leading zeros
      setDays(days.toString().padStart(2, '0'));
      setHours(hours.toString().padStart(2, '0'));
      setMinutes(minutes.toString().padStart(2, '0'));
      setSeconds(seconds.toString().padStart(2, '0'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format date: 4th May 2025
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    // Add suffix to day
    const suffix = getDaySuffix(day);
    
    return `${day}${suffix} ${month} ${year}`;
  };

  // Get day suffix (st, nd, rd, th)
  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl p-6 mb-6">
      {/* Date and Time */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white/10 p-2 rounded-lg mr-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-lg font-medium">{formatDate(nextWorkshopDate)}</div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-white/10 p-2 rounded-lg mr-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-lg font-medium">7 PM IST</div>
        </div>
      </div>
      
      {/* Host Info */}
      <div className="flex items-center mb-6">
        <div className="bg-white/10 p-2 rounded-lg mr-3 flex-shrink-0">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="text-sm md:text-lg font-medium">Host: Top Experts from Tech Tycoon </div>
      </div>
      
      {/* Countdown Timer */}
      <div>
        <h3 className="text-center text-xl mb-4">Workshop Starts In...</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-yellow-400 text-black text-center p-3 rounded-lg w-20 sm:w-24">
            <div className="text-3xl sm:text-4xl font-bold">{days}</div>
            <div className="text-xs sm:text-sm font-medium">Days</div>
          </div>
          
          <div className="bg-yellow-400 text-black text-center p-3 rounded-lg w-20 sm:w-24">
            <div className="text-3xl sm:text-4xl font-bold">{hours}</div>
            <div className="text-xs sm:text-sm font-medium">Hours</div>
          </div>
          
          <div className="bg-yellow-400 text-black text-center p-3 rounded-lg w-20 sm:w-24">
            <div className="text-3xl sm:text-4xl font-bold">{minutes}</div>
            <div className="text-xs sm:text-sm font-medium">Minutes</div>
          </div>
          
          <div className="bg-yellow-400 text-black text-center p-3 rounded-lg w-20 sm:w-24">
            <div className="text-3xl sm:text-4xl font-bold">{seconds}</div>
            <div className="text-xs sm:text-sm font-medium">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCountdown; 