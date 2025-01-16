import { useState } from "react";

const filters = [
  "all",
  "mine",
  "backend",
  "frontend",
  "marketing",
  "smm",
  "mobilograf",
];

export function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState("all");

  return (
    <div role="tablist" className="tabs tabs-boxed mb-8 w-full">
      {filters.map((filter) => {
        return (
          <a
            onClick={() => {
              setCurrentFilter(filter);
              changeFilter(filter);
            }}
            key={filter}
            role="tab"
            className={`tab ${currentFilter == filter ? "tab-active" : ""}`}
          >
            {filter}
          </a>
        );
      })}
    </div>
  );
}
