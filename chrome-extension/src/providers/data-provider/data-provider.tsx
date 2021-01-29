import React, { useState, useEffect } from "react";
import { browser } from "webextension-polyfill-ts";
import DataContext from "../../contexts/data-context";
import { retrieve } from "../../utils/store";

type DataProviderProps = {
  children: any;
};

export default function DataProvider({ children }: DataProviderProps) {
  const [kaggleList, setKaggleList] = useState([]);

  function updateKaggleList() {
    retrieve("KAGGLE_LIST").then((list) => {
      list && setKaggleList(list);
    });
  }

  browser.storage.onChanged.addListener(() => {
    updateKaggleList();
  });

  useEffect(() => {
    updateKaggleList();
  }, []);

  return (
    <DataContext.Provider
      value={{
        kaggleList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
