"use client";

import DashboardBottomTab from "@/components/main/DashboardBottomTab";
import DashboardSidebar from "@/components/main/DashboardSidebar";
import ProtectedRoute from "@/components/main/ProtectedRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="h-screen flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Desktop Sidebar (fixed) */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="w-full lg:ml-20 overflow-y-auto">{children}</div>

        {/* Mobile Bottom Navigation */}
        <DashboardBottomTab />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
