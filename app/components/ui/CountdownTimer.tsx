import { useState, useEffect } from 'react';

interface CountdownTimerProps {
    targetDate: Date;
    className?: string;
}

export function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +targetDate - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatTime = (value: number) => {
        return value < 10 ? `0${value}` : value;
    };

    // @ts-ignore
    if (!timeLeft.h && !timeLeft.m && !timeLeft.s) {
        return <span className={className}>SALE ENDED</span>;
    }

    return (
        <span className={`font-mono font-bold ${className}`}>
            {/* @ts-ignore */}
            {formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}
        </span>
    );
}
