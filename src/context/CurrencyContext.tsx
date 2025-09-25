import React, {createContext, useContext, useState, useMemo} from 'react';
import type { CurrencyCode } from '../types';

type ctx = {
  target: CurrencyCode;
  setTarget: (c: CurrencyCode) => void;
};
const CurrencyContext = createContext<ctx | null>(null);

export const CurrencyProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [target, setTarget] = useState<CurrencyCode>('USD');
  const value = useMemo(()=>({target, setTarget}), [target]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const c = useContext(CurrencyContext);
  if (!c) throw new Error('useCurrency must be used within CurrencyProvider');
  return c;
};
