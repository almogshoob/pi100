import { useEffect, useState } from "react";
import { PI } from "../../utils/utils";
import { useDigitsStore } from "../../stores";

const Console = () => {
  const { digits, appendDigit, resetDigits, getDigitsLength } =
    useDigitsStore();
  const [isWrong, setIsWrong] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const handleDigitClick = (digit) => {
    const currentLength = getDigitsLength();
    if (digit !== PI[currentLength]) setIsWrong(true);
    else if (currentLength === 2 + 99) setIsWin(true);
    appendDigit(digit);
  };

  const handleRestart = () => {
    resetDigits();
    setIsWrong(false);
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (event.charCode >= 48 && event.charCode <= 57)
        handleDigitClick(event.key);
    };

    // init
    if (!isWin && !isWrong) {
      document.documentElement.focus();
      document.addEventListener("keypress", handleKey);
      return () => document.removeEventListener("keypress", handleKey);
    }
    if (isWrong) {
      const bestScore = localStorage.getItem("best-score");
      const currentScore = digits.length - 3;
      if (!bestScore || currentScore > bestScore)
        localStorage.setItem("best-score", currentScore);
    }
    if (isWin) {
      localStorage.setItem("best-score", 100);
    }
  }, [isWrong, isWin]);

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
            disabled={isWrong || isWin}
          >
            {digit}
          </button>
        ))}
      </div>
      {(isWin || isWrong) && (
        <>
          <p className="result">
            {isWin ? (
              <>
                You remembered all 100 digit! <br /> 🎉😯👏
              </>
            ) : (
              <>
                You remembered {digits.length - 3} digits!
                <br />
                Best Score:{" "}
                {Math.max(
                  digits.length - 3,
                  localStorage.getItem("best-score")
                )}
              </>
            )}
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

export { Console };
