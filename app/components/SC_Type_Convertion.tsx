"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { useStore } from "@/app/store/useSection";

export default function SC_Type_Convertion() {

 
  const setOption = useStore( (store) =>  store.setOptionConvertion  )

  const handleValueChange = (value: string) => {
     setOption(value);
  };

  return (
    <Tabs.Root
      onValueChange={handleValueChange}
      defaultValue="1"
      className="flex flex-col w-80"
    >
      <Tabs.List className="flex p-1 bg-gray-100 rounded-xl bg-opacity-80">
        <Tabs.Trigger
          value="1"
          className="flex-1 px-4 py-1 text-lg font-medium rounded-lg transition-all 
                     data-[state=active]:bg-green-700 data-[state=active]:shadow-sm 
                     data-[state=active]:text-black text-gray-500"
        >
          Divisas a Bs
        </Tabs.Trigger>
        <Tabs.Trigger
          value="2"
          className="flex-1 px-4 py-1 text-lg font-medium rounded-lg transition-all 
                     data-[state=active]:bg-[#97573a] data-[state=active]:shadow-sm 
                     data-[state=active]:text-black text-gray-500"
        >
          Bs a Divisas
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
