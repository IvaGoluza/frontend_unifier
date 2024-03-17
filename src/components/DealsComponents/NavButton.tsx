import React from "react";

interface NavButtonProps {
  leftOnly: boolean;
  rightOnly: boolean;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ leftOnly, rightOnly, onLeftClick, onRightClick }) => {
  const handleLeftKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" && onLeftClick) onLeftClick();
  };

  const handleRightKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" && onRightClick) onRightClick();
  };

  return (
    <div className="absolute right-10 h-10 w-[5.7rem] justify-self-center rounded-full border border-[3px] border-[#1F2340] px-2 shadow-xl sm:right-16">
      <div className="relative h-full w-full">
        {!rightOnly && (
          <div
            tabIndex={0}
            className="absolute left-0 top-[5px] h-6 w-8 cursor-pointer rounded-full bg-[#1F2340] text-center text-xl font-bold text-white"
            onClick={onLeftClick}
            onKeyDown={handleLeftKeyDown}
          >
            <p className="-translate-y-1 transform">&lt;</p>
          </div>
        )}
        {!leftOnly && (
          <div
            tabIndex={0}
            className="absolute right-0 top-[5px] h-6 w-8 cursor-pointer rounded-full bg-[#1F2340] text-center text-xl font-bold text-white"
            onClick={onRightClick}
            onKeyDown={handleRightKeyDown}
          >
            <p className="-translate-y-1 transform">&gt;</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavButton;
