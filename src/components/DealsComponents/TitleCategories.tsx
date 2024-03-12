import React from "react";

import { nanoid } from "nanoid";

import CategoryCard from "./CategoryCard";

interface TitleCategoriesProps {
  title: string;
  categories: string[];
  textColor: string;
  bgColor: string;
}

const TitleCategories: React.FC<TitleCategoriesProps> = ({ title, categories, bgColor, textColor }) => {
  return (
    <>
      <h1 className="min-w-96 mt-4 w-5/6 text-3xl font-extrabold uppercase text-[#B0A9F9]">{title}</h1>
      <section className="min-w-96 flex w-5/6 flex-row flex-wrap">
        {categories.map((category) => (
          <CategoryCard key={nanoid()} category={category} textColor={textColor} bgColor={bgColor} />
        ))}
      </section>
    </>
  );
};

export default TitleCategories;
