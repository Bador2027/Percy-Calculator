
import React, { useState } from 'react';

type Operator = '+' | '-' | '*' | '/';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const performCalculation = (first: number, second: number, op: Operator): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };

  const handleOperator = (nextOperator: Operator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(firstOperand, inputValue, operator);
      setDisplayValue(String(parseFloat(result.toPrecision(15))));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && firstOperand !== null) {
      const result = performCalculation(firstOperand, inputValue, operator);
      setDisplayValue(String(parseFloat(result.toPrecision(15))));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };


  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };
  
  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if(currentValue === 0) return;
    setDisplayValue(String(currentValue / 100));
  }
  
  const renderButton = (label: string, onClick: () => void, className: string = '') => (
    <button
      onClick={onClick}
      className={`text-2xl md:text-3xl font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition-all duration-200 ease-in-out ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gradient-to-br from-pink-100 to-pink-300 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xs md:max-w-sm mx-auto bg-pink-50/70 backdrop-blur-sm rounded-3xl shadow-2xl shadow-pink-200/50 p-6 space-y-6">
        <div className="bg-pink-100/50 rounded-2xl p-4 text-right shadow-inner shadow-pink-200/60">
          <p 
            className="text-4xl md:text-5xl font-light text-pink-800 break-all"
            style={{ minHeight: '3rem' }}
          >
            {displayValue}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {renderButton('AC', clearAll, 'bg-pink-200 text-pink-700 hover:bg-pink-300 active:bg-pink-400')}
          {renderButton('±', toggleSign, 'bg-pink-200 text-pink-700 hover:bg-pink-300 active:bg-pink-400')}
          {renderButton('%', inputPercent, 'bg-pink-200 text-pink-700 hover:bg-pink-300 active:bg-pink-400')}
          {renderButton('÷', () => handleOperator('/'), 'bg-pink-400 text-white hover:bg-pink-500 active:bg-pink-600')}

          {renderButton('7', () => inputDigit('7'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('8', () => inputDigit('8'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('9', () => inputDigit('9'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('×', () => handleOperator('*'), 'bg-pink-400 text-white hover:bg-pink-500 active:bg-pink-600')}

          {renderButton('4', () => inputDigit('4'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('5', () => inputDigit('5'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('6', () => inputDigit('6'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('-', () => handleOperator('-'), 'bg-pink-400 text-white hover:bg-pink-500 active:bg-pink-600')}

          {renderButton('1', () => inputDigit('1'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('2', () => inputDigit('2'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('3', () => inputDigit('3'), 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('+', () => handleOperator('+'), 'bg-pink-400 text-white hover:bg-pink-500 active:bg-pink-600')}

          {renderButton('0', () => inputDigit('0'), 'col-span-2 bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('.', inputDecimal, 'bg-white text-pink-500 hover:bg-pink-100 active:bg-pink-200')}
          {renderButton('=', handleEquals, 'bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700')}
        </div>
      </div>
    </div>
  );
};

export default App;
