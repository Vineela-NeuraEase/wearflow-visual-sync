
import { Outlet } from "react-router-dom";
import { useTheme as useThemeProvider } from "../theme-provider";
import { BottomNav } from "./BottomNav";
import { Toaster } from "@/components/ui/toaster";

export const Layout = () => {
  const { theme } = useThemeProvider();
  
  return (
    <div className={`min-h-screen pb-16 ${theme === 'dark' ? 'dark bg-gray-900' : ''}`}>
      <main className="max-w-md mx-auto pt-4">
        <Outlet />
      </main>
      <BottomNav />
      <Toaster />
    </div>
  );
};
