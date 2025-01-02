"use client";
import { useState, useEffect, useRef} from 'react';
import { useWindowSize } from '@reactuses/core';
import Confetti from 'react-confetti';
import CountDown from '@/components/CountDown';
import { Fireworks, FireworksHandlers } from '@fireworks-js/react';

type TimeLeft = {
  hours: number,
  minutes: number,
  seconds: number
}

/**
 * @description Calculates the time difference between two Date objects and returns an object
 * representing the time left in hours, minutes, and seconds.
 * @param now new Date()
 * @param then new Date()
 * @returns an object representing the hours, minutes, and seconds from now to then.
 * @example
 * const now = new Date();  //< get current time
 * const then = new Date().setHours(23, 59, 59, 0);  //< set time to midnight
 * const timeLeft = getTimeUntil(now, then);
 * console.log(`Midnight is in: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`);
 */
const getTimeUntil = (now: Date, then: Date): TimeLeft => {
  const diff = then.getTime() - now.getTime();
  const dist = Math.abs(diff);
  const sign = Math.sign(diff);
  const hours = sign * Math.floor(dist / (1000 * 60 * 60) % 24);
  const minutes = sign * Math.floor(dist / (1000 * 60) % 60);
  const seconds = sign * Math.floor((dist / 1000) % 60);
  return { hours, minutes, seconds };
}

/**
 * @description Returns the seconds representation of a TimeLeft object.
 * @param timeLeft an object representing the hours, minutes, and seconds to a set time.
 * @returns the seconds to the set time.
 */
const getSecondsLeft = (timeLeft: TimeLeft): number => {
  return timeLeft.hours * 360 + timeLeft.minutes * 60 + timeLeft.seconds;
}


export default function Home() {
  const fireworkRef = useRef<FireworksHandlers>(null);
  const midnight = useRef(new Date());
  midnight.current.setHours(23, 59, 59, 0);
  const [animate, setAnimate] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeUntil(new Date(), midnight.current));
  const [happyNewYear, setHappyNewYear] = useState<boolean>(false);
  const { width, height } = useWindowSize();

  /* This updates the countdown clock */
  useEffect(() => {
    const timer = setInterval(() => {
        const timeLeft = getTimeUntil(new Date(), midnight.current);
        const secondsLeft = getSecondsLeft(timeLeft);
        if (secondsLeft <= 10) {
          handleCountDownAnimate(true);         //< Add 'impact' animation to the last ten seconds.
        }
        if (secondsLeft <= 0) {
          setHappyNewYear(true);               //< Render the confetti, fireworks, and '2025' text.
        }
        setTimeLeft(timeLeft);                           //< Update the time left on the countdown.
    }, 1000);                                                              //< repeat every second.
    return () => clearInterval(timer);    //< cleanup function is called when component 'unmounts'.
  }, []);

  /* I'm using a callback function to prevent data races when handling the async animations. */
  const handleCountDownAnimate = (start: boolean) => {
    setAnimate(() => {
      return start;
    });
  }

  return (
    <>
      <div className={'absolute'}>
       
        {/* https://www.npmjs.com/package/react-confetti */}
        {happyNewYear && <Confetti
          width={width}
          height={height}
        />}
       
        {/* https://github.com/crashmax-dev/fireworks-js */}
        {happyNewYear && <Fireworks
          ref={fireworkRef}
          options={{ 
            opacity: 0.5,
            rocketsPoint: {
              min: 20,
              max: 80
            },
            lineWidth: {
              explosion: {
                min: 5,
                max: 10
              },
              trace: {
                min: 4,
                max: 8
              }
            },
            brightness: {
              min: 30,
              max: 100
            },
            delay: {
              min: 10,
              max: 50
            },
            sound: {
              enabled: true,
              files: ["/sound/firework-01.mp3", "/sound/firework-02.mp3"],
              volume: {
                min: 4,
                max: 8
              }
            }
          }}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
          }}
        />}
      </div>
      
      {/* Render the countdown clock when counting down then '2025' when the clock reaches 0 */}
      <div className={`flex h-screen justify-center items-center`}>
        {!happyNewYear && 
          <CountDown 
            animate={animate} 
            onAnimateEnd={() => handleCountDownAnimate(false)} 
            hours={timeLeft['hours']} 
            minutes={timeLeft['minutes']} 
            seconds={timeLeft['seconds']}/>
        }
        {happyNewYear && 
          <div 
          className='text-6xl font-bold'>
            2025
          </div>
        }
      </div>
   </>
  );
}
