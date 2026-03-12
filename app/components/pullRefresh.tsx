"use client";

import PullToRefresh from 'react-simple-pull-to-refresh';

export default function PullRefresh({ children }: { children: React.ReactNode }) {
  
  const handleRefresh = async () => {
    
    window.location.reload();
    return Promise.resolve();
  };

  return (
    <PullToRefresh 
      onRefresh={handleRefresh}
      className="custom-pull" 
      pullingContent={""}    
    >
      {children}
    </PullToRefresh>
  );
}