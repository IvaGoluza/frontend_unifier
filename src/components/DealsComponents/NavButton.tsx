import React from "react";

interface NavButtonProps {
  leftOnly: boolean;
  rightOnly: boolean;
  onLeftClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ leftOnly, rightOnly, onLeftClick }) => {
  return (
    <div className="absolute bottom-10 right-10 h-10 w-[5.7rem] rounded-full border border-[3px] border-[#1F2340] px-2 shadow-xl">
      <div className="relative h-full w-full">
        {!rightOnly && (
          <div
            className="absolute left-0 top-[5px] h-6 w-8 cursor-pointer rounded-full bg-[#1F2340] text-center text-xl font-bold text-white"
            onClick={onLeftClick}
          >
            <p className="-translate-y-1 transform">&lt;</p>
          </div>
        )}
        {!leftOnly && (
          <div className="absolute right-0 top-[5px] h-6 w-8 cursor-pointer rounded-full bg-[#1F2340] text-center text-xl font-bold text-white">
            <p className="-translate-y-1 transform">&gt;</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavButton;
