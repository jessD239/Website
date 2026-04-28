import "./HamburgerButton.css";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <button
      className={`hamburger${isOpen ? " hamburger--open" : ""}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onClick}
    >
      <div className="hamburger__icon" />
    </button>
  );
};

export default HamburgerButton;
