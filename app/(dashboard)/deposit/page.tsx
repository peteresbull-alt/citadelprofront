import React from "react";
import DepositClientComponent from "./_components/DepositClientComponent";
import DashboardNavbar from "@/components/main/DashboardNavbar";

const DepositPage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <DepositClientComponent />
    </div>
  );
};

export default DepositPage;
