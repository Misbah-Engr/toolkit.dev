"use client";

import React, { createContext, useContext, useState } from "react";
import { type Chat } from "@prisma/client";

type DataContextType = {
  chatsList: Chat[];
  setChatsList: React.Dispatch<React.SetStateAction<Chat[]>>;
  refetchChats: () => void;
  setRefetchChats: React.Dispatch<React.SetStateAction<() => void>>;
  activeChat: Chat | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatsList, setChatsList] = useState<Chat[]>([]);
  const [refetchChats, setRefetchChats] = useState<() => void>(() => () => {});
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const value: DataContextType = {
    chatsList,
    setChatsList,
    refetchChats,
    setRefetchChats,
    activeChat,
    setActiveChat,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useRefetchChats = (refetchFn: () => void) => {
  const { setRefetchChats } = useDataContext();
  setRefetchChats(() => refetchFn);
};
