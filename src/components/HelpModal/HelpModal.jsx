import { useDigitsStore } from "../../stores";
import { Modal } from "../../templates";
import { PI } from "../../utils/utils";

const HelpModal = ({ open, onClose }) => {
  const bestScore = parseInt(localStorage.getItem("best-score") || 0);
  const { getDigitsLength } = useDigitsStore();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="help-modal">
        <p className="pi-helper" disabled={getDigitsLength() > 2}>
          <span>{PI.slice(2, 2 + bestScore)}</span>
          <span>{PI.slice(2 + bestScore)}</span>
        </p>
      </div>
    </Modal>
  );
};

export { HelpModal };
