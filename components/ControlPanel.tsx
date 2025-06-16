import React from 'react';
import { DeJongParams } from '../types';

interface ControlPanelProps {
  params: DeJongParams;
  onParamChange: (newParams: Partial<DeJongParams>) => void;
  onResetParams: () => void;
  isAnimatingParams: boolean;
  onToggleParamAnimation: () => void;
}

const PARAM_CONFIG = [
  { id: 'a', label: 'a', min: -3, max: 3, step: 0.01 },
  { id: 'b', label: 'b', min: -3, max: 3, step: 0.01 },
  { id: 'c', label: 'c', min: -3, max: 3, step: 0.01 },
  { id: 'd', label: 'd', min: -3, max: 3, step: 0.01 },
  { id: 'e', label: 'e', min: -3, max: 3, step: 0.01 },
  { id: 'f', label: 'f', min: -3, max: 3, step: 0.01 },
] as const; // To ensure id is a key of DeJongParams

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  params, 
  onParamChange, 
  onResetParams,
  isAnimatingParams,
  onToggleParamAnimation
}) => {
  const handleSliderChange = (paramId: keyof DeJongParams, value: string) => {
    onParamChange({ [paramId]: parseFloat(value) });
  };

  const handleNumberChange = (paramId: keyof DeJongParams, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onParamChange({ [paramId]: numValue });
    }
  };

  return (
    <div className="p-6 space-y-6 text-sm">
      <h2 className="text-2xl font-semibold text-indigo-400 border-b border-gray-700 pb-3 mb-6">
        파라미터 설정
      </h2>
      
      {PARAM_CONFIG.map(({ id, label, min, max, step }) => (
        <div key={id} className="space-y-2">
          <label htmlFor={id} className="block font-medium text-gray-300">
            {label}: <span className="text-indigo-400 font-mono">{params[id].toFixed(2)}</span>
          </label>
          <input
            type="range"
            id={id}
            name={id}
            min={min}
            max={max}
            step={step}
            value={params[id]}
            onChange={(e) => handleSliderChange(id, e.target.value)}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            disabled={isAnimatingParams}
          />
          <input
            type="number"
            id={`${id}-number`}
            name={`${id}-number`}
            min={min}
            max={max}
            step={step}
            value={params[id]}
            onChange={(e) => handleNumberChange(id, e.target.value)}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isAnimatingParams}
          />
        </div>
      ))}
      
      <button
        onClick={onToggleParamAnimation}
        className={`w-full mt-4 py-2 px-4 text-white font-semibold rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
          ${isAnimatingParams ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'}`}
      >
        {isAnimatingParams ? '파라미터 애니메이션 중지' : '파라미터 애니메이션 시작'}
      </button>

      <button
        onClick={onResetParams}
        className="w-full mt-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        disabled={isAnimatingParams}
      >
        기본값으로 초기화
      </button>

      <div className="pt-6 mt-6 border-t border-gray-700 text-xs text-gray-400">
        <h3 className="font-semibold text-gray-300 mb-2">조작법:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>회전:</strong> 마우스 드래그 또는 한 손가락 터치</li>
          <li><strong>확대/축소:</strong> 마우스 휠 또는 두 손가락 핀치</li>
          <li><strong>이동:</strong> 마우스 오른쪽 버튼 드래그 또는 세 손가락 터치</li>
        </ul>
         <h3 className="font-semibold text-gray-300 mt-4 mb-2">애니메이션:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>입자 색상은 항상 시간에 따라 변화합니다.</li>
          <li>'파라미터 애니메이션 시작' 버튼으로 프랙탈 형태 변화 애니메이션을 켜고 끌 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;