"use client";

interface CountDownProps {
    animate: boolean;
    onAnimateEnd: () => void;
    hours: number;
    minutes: number;
    seconds: number;
};

export default function CountDown({ animate, onAnimateEnd, hours, minutes, seconds }: CountDownProps) {
    let countDownText = '';

    const handleAnimationEnd = () => {
        onAnimateEnd();
    }

    if (hours > 0) {
        countDownText += `${hours} : `;
    }
    
    if (minutes > 9) {
        countDownText += `${minutes} : `;
    } else if (minutes >= 0 && (hours > 0)) {
        countDownText += `0${minutes} : `;
    } else if (minutes > 0) {
        countDownText += `${minutes} : `;
    }

    if (seconds > 9) {
        countDownText += `${seconds}`;
    } else if (seconds >= 0 && (minutes > 0 || hours > 0)) {
        countDownText += `0${seconds}`;
    } else if (seconds > 0) {
        countDownText += `${seconds}`;
    }
    
    return (
        <div className={`text-6xl font-bold ${animate ? 'animate-grow' : ''}`} onAnimationEnd={handleAnimationEnd}>
            {countDownText}
        </div>
    );
}