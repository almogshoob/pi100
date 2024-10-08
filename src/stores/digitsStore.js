import { create } from "zustand";

const useDigitsStore = create((set, get) => ({
  digits: ["3", "."],
  getDigitsLength: () => get().digits.length,
  appendDigit: (digit) => set((state) => ({ digits: [...state.digits, digit.toString()] })),
  resetDigits: () => set({ digits: ["3", "."] }),
  gameState: "playing", // playing / fail / success
  setGameState: (gameState) => set({ gameState })
}));

export { useDigitsStore }