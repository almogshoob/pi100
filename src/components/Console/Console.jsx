import { useEffect, useRef, useState } from "react";
import { PI } from "../../utils/utils";

const Console = () => {
  const [digits, setDigits] = useState(["3", "."]);
  const [isWrong, setIsWrong] = useState(false);

  // const isMobile = navigator.maxTouchPoints > 0;

  const handleDigitClick = (digit) => {
    setDigits((prev) => {
      if (digit !== PI[prev.length]) setIsWrong(true);
      return [...prev, digit.toString()];
    });
  };

  const handleRestart = () => {
    setDigits(["3", "."]);
    setIsWrong(false);
  };

  useEffect(() => {
    if (!isWrong) {
      const handleKey = (event) => {
        handleDigitClick(event.key);
      };

      document.documentElement.focus();
      document.addEventListener("keypress", handleKey);

      return () => document.removeEventListener("keypress", handleKey);
    }
  }, [isWrong]);

  return (
    <div className="console | column">
      <h2 className="three-dots">Enter next digit</h2>
      <p className="digits" iswrong={isWrong.toString()}>
        {digits
          .map((digit, i) => <span key={i}>{digit}</span>)
          .splice(Math.max(digits.length - 20, 0))}
      </p>
      <div className="numpad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((digit) => (
          <button
            key={digit}
            onClick={() => handleDigitClick(digit)}
            disabled={isWrong}
          >
            {digit}
          </button>
        ))}
      </div>
      {isWrong && (
        <>
          <p className="result">
            You remembered {digits.length - 3} digits! 👏
          </p>
          <button className="restart-button" onClick={handleRestart}>Try Again</button>
        </>
      )}
    </div>
  );
};

export { Console };
