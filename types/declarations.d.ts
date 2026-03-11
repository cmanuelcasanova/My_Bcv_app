declare module 'react-segmented-control' {
  import React from 'react';

  interface SegmentedControlProps {
    name: string;
    options: Array<{
      label: string;
      value: string | number;
      default?: boolean;
    }>;
    setValue: (value: any) => void;
    style?: React.CSSProperties;
    variant?: 'base' | 'dark';
  }

  const SegmentedControl: React.FC<SegmentedControlProps>;
  export default SegmentedControl;
}