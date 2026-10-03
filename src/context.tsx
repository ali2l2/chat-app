import { createContext, useState, ReactNode } from 'react';

export const usecontext1 = createContext<any>(null);

const blueprintData = [
  ["how much energy does it requires","less energy","more energy","how much energy i have right now ","less energy","more energy",0,5],
  ["how calm does it requires to be","completely calm","noisy","how calm actually it is right now","it's completely calm","it's noisy",0,5],
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [searchState, setSearchState] = useState(false);
  const [blueprint, setBlueprint] = useState(blueprintData);
  const [multiInputValue, setMultiInputValue] = useState<any[]>([]);
  const [dataForChecker, setDataForChecker] = useState(
    blueprintData.map(item => [0, item.at(-1)])
  );

  return (
    <usecontext1.Provider
      value={[
        multiInputValue, setMultiInputValue,
        blueprint, setBlueprint,
        dataForChecker, setDataForChecker,
        searchState, setSearchState,
      ]}
    >
      {children}
    </usecontext1.Provider>
  );
}