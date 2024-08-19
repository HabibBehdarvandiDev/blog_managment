import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto" style={{ width: "min(100% - 15px, 1610px)" }}>
      {children}
    </div>
  );
};

export default Container;
