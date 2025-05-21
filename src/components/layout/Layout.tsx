
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

const Layout = () => {
  const location = useLocation();
  const fullScreenPages = ["/breathing", "/visual", "/sos", "/haptic"];
  const isFullScreen = fullScreenPages.includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-md mx-auto">
      <main className="flex-1 p-4 pb-20">
        <Outlet />
      </main>
      {!isFullScreen && <BottomNav />}
    </div>
  );
};

export default Layout;
