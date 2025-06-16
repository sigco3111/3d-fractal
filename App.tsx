import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DeJongParams } from './types';
import { INITIAL_PARAMS } from './constants';
import FractalViewer from './components/FractalViewer';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [params, setParams] = useState<DeJongParams>(INITIAL_PARAMS);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(true);
  const [isAnimatingParams, setIsAnimatingParams] = useState<boolean>(false);
  const [animationTick, setAnimationTick] = useState<number>(0);
  const paramAnimationIdRef = useRef<number | null>(null);

  const handleParamChange = useCallback((newParams: Partial<DeJongParams>) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  }, []);

  const resetParams = useCallback(() => {
    setParams(INITIAL_PARAMS);
  }, []);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const toggleParamAnimation = useCallback(() => {
    setIsAnimatingParams(prevIsAnimating => {
      const newIsAnimating = !prevIsAnimating;
      if (newIsAnimating) {
        // When starting the animation, reset parameters to their initial values.
        // The FractalViewer will then use these INITIAL_PARAMS as the base for modulation.
        setParams(INITIAL_PARAMS);
        // setAnimationTick(0); // Optional: Reset tick if animation should always restart identically
      }
      return newIsAnimating;
    });
  }, [setParams]); // INITIAL_PARAMS is a constant, setParams is a dependency

  useEffect(() => {
    if (isAnimatingParams) {
      const animate = () => {
        setAnimationTick(prevTick => prevTick + 1);
        paramAnimationIdRef.current = requestAnimationFrame(animate);
      };
      paramAnimationIdRef.current = requestAnimationFrame(animate);
    } else {
      if (paramAnimationIdRef.current) {
        cancelAnimationFrame(paramAnimationIdRef.current);
      }
    }
    return () => {
      if (paramAnimationIdRef.current) {
        cancelAnimationFrame(paramAnimationIdRef.current);
      }
    };
  }, [isAnimatingParams]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-900 text-white overflow-hidden">
      <button
        onClick={togglePanel}
        className="fixed top-4 left-4 z-20 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md md:hidden"
        aria-label={isPanelVisible ? "컨트롤 패널 숨기기" : "컨트롤 패널 보이기"}
        title={isPanelVisible ? "컨트롤 패널 숨기기" : "컨트롤 패널 보이기"}
      >
        {isPanelVisible ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>
      
      <div 
        className={`
          ${isPanelVisible ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          transition-transform duration-300 ease-in-out 
          fixed md:static top-0 left-0 h-full z-10 
          w-full max-w-xs md:w-72 lg:w-80 
          bg-gray-800 shadow-xl overflow-y-auto custom-scrollbar
        `}
      >
        <ControlPanel
          params={params}
          onParamChange={handleParamChange}
          onResetParams={resetParams}
          isAnimatingParams={isAnimatingParams}
          onToggleParamAnimation={toggleParamAnimation}
        />
      </div>

      <div className="flex-1 h-full w-full relative">
        <FractalViewer 
          params={params} 
          isAnimatingParams={isAnimatingParams}
          animationTick={animationTick}
        />
      </div>
    </div>
  );
};

export default App;