import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[500px] md:max-w-[1000px] mx-auto px-3 py-4">
      {children}
    </div>
  );
};

export default Container;
