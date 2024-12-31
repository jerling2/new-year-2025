"use client";
import { useWindowSize } from '@reactuses/core'
import Confetti from 'react-confetti'


export default function Home() {
  const { width, height } = useWindowSize();
  return (
   <Confetti
    width={width}
    height={height}
   />
  );
}
