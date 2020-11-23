import React, { createContext } from 'react';

export const ProgContext = createContext({});

export function ProgProvider({ children, store }) {
  return (
    <ProgContext.Provider value={ store }>
    { children }
    </ProgContext.Provider>
  )
}
