import React, { useContext, createContext } from "react";
import { DataStore } from ".";

let dataStore: DataStore

const DataStoreContext = createContext<DataStore | undefined>(undefined)

export const DataStoreProvider = ({children}: {children: React.ReactNode}) => {
  const store = dataStore ?? new DataStore()
  return (
    <DataStoreContext.Provider value={store}>
      {children}
    </DataStoreContext.Provider>
  )
}

export const useDataStore = () => {
  const context = useContext(DataStoreContext)
  if (context === undefined) throw new Error("Data store must be initialized")
  return context
}
