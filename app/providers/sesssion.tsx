"use client";
import { Session, User } from "lucia";
import React from "react";

type SessionPayload = {
  user: User | null;
  session: Session | null;
};

const SessionContex = React.createContext<SessionPayload>({} as SessionPayload);
export default function RootLayout({
  children,
  value,
}: Readonly<{
  children: React.ReactNode;
  value: SessionPayload;
}>) {
  return (
    <SessionContex.Provider value={value}>{children}</SessionContex.Provider>
  );
}

export const useAuth = () => {
  const sessionCtx = React.useContext(SessionContex);
  if (!sessionCtx.user) {
    throw new Error("Session missing");
  }
  return sessionCtx;
};
