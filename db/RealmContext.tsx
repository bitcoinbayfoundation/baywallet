import React from "react";
import Realm from "realm";
import { RealmProvider } from "@realm/react";
import { Note } from "./schemas/Note";

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [Note],
};

// Expose a realm
export const RealmDataProvider = ({ children }) => {
  return (
    <RealmProvider {...realmConfig}>
      {children}
    </RealmProvider>
  );
}