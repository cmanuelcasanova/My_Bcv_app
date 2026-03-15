"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { useStore } from "@/app/store/useSection";
export default function SegmentedControl() {

 
  const setOption = useStore( (store) =>  store.setOption  )

  const handleValueChange = (value: string) => {
    
  };

  return (
    <Tabs.Root
      onValueChange={handleValueChange}
      defaultValue="1"
      className="flex flex-col w-[90%] mx-4"
    >
      <Tabs.List className="flex p-1 bg-gray-100 rounded-xl bg-opacity-80">
        <Tabs.Trigger
          value="1"
          className="flex-1 px-4 py-2 text-lg font-bold rounded-lg transition-all 
                     data-[state=active]:bg-green-700 data-[state=active]:shadow-sm 
                     data-[state=active]:text-black text-gray-500"
        >
          Bcv Dolar
        </Tabs.Trigger>
        <Tabs.Trigger
          value="2"
          className="flex-1 px-4 py-2 text-lg font-bold rounded-lg transition-all 
                     data-[state=active]:bg-orange-500 data-[state=active]:shadow-sm 
                     data-[state=active]:text-black text-gray-500"
        >
          Binance
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
