import React, { createContext } from 'react';

export const GlContext = createContext({});

export function Provider({ children, store }) {
  return (
    <GlContext.Provider value={ store }>
    { children }
    </GlContext.Provider>
  )
}
