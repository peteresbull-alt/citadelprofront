"use client";

import DashboardBottomTab from "@/components/main/DashboardBottomTab";
import DashboardSidebar from "@/components/main/DashboardSidebar";
import ProtectedRoute from "@/components/main/ProtectedRoute";

const ProtectedComponentLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ProtectedRoute>
      <div className="">{children}</div>
    </ProtectedRoute>
  );
};

export default ProtectedComponentLayout;
