"use client";
import React from "react";
import { AppStore, makeStore } from "../store";
import { Provider } from "react-redux";

export const ReduxProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const storeRef = React.useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <React.Fragment>
      <Provider store={storeRef.current}>{children}</Provider>
    </React.Fragment>
  );
};
