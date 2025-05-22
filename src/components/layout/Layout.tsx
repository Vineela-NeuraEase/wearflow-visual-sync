
import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { BottomNav } from "./BottomNav";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/SiteHeader"; 
import { SiteFooter } from "@/components/SiteFooter";

export const Layout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900' : ''}`}>
      <SiteHeader />
      <main className="flex-grow max-w-md mx-auto w-full pt-4 px-4">
        <Outlet />
      </main>
      <BottomNav />
      <SiteFooter />
    </div>
  );
};
