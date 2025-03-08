import { useStrictContext } from "@/shared/lib/use-strict-context";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type StatusFilter = null | "Scheduled" | "Ongoing" | "Finished";

type Filter = {
  status: StatusFilter;
};

const defaultFilter: Filter = { status: null };

const FilterContext = createContext<{
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
} | null>(null);

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useStrictContext(FilterContext);

export { FilterProvider, useFilter };
