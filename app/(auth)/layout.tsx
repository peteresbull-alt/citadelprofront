import UnprotectedAuthRoute from "@/components/main/UnprotectedAuthRoute";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <UnprotectedAuthRoute>{children}</UnprotectedAuthRoute>;
};

export default AuthLayout;
