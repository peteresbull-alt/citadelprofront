"use client";
import CheckKYCComponent from "@/components/main/CheckKYCComponent";
import DashboardSidebar from "@/components/main/DashboardSidebar";
import ProtectedRoute from "@/components/main/ProtectedRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* <div className="h-screen flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"> */}
        {/* Desktop Sidebar (fixed) */}
        <DashboardSidebar />

        <CheckKYCComponent />

        {/* Main Content */}
        <div className="">{children}</div>
       
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
