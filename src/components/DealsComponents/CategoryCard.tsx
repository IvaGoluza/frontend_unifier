import React from "react";

interface CategoryCardProps {
  category: string;
  textColor: string;
  bgColor: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, textColor, bgColor }) => {
  const additionalCSS = {
    backgroundColor: `#${bgColor}`,
    color: `#${textColor}`,
  };

  return (
    <div className={"m-1 ml-0 w-fit rounded-full px-4 py-1 text-[10px] font-semibold uppercase"} style={additionalCSS}>
      {category}
    </div>
  );
};

export default CategoryCard;
