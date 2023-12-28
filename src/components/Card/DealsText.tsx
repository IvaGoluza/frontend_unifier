import React from "react";

interface text {
  h1: string;
  h2: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

export default function DealsText({ h1, h2, p1, p2, p3, p4 }: text) {
  return (
    <div className={"absolute left-40 top-24"}>
      <p className={"text-4xl font-bold text-indigo-400"}>{h1}</p>
      <p className={"text-4xl font-bold text-indigo-400"}>{h2}</p>
      <p className={"mt-3 pl-10 font-bold text-white"}>{p1}</p>
      <p className={"mb-3 pl-10 font-bold text-white"}>{p2}</p>
      <p className={"pl-20 text-emerald-900"}>{p3}</p>
      <p className={"pl-20 text-emerald-900"}>{p4}</p>
    </div>
  );
}
