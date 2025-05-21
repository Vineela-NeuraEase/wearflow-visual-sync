
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell, Accessibility } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

const MenuDrawer = () => {
  const navigate = useNavigate();
  const { highContrastEnabled, reducedMotionEnabled } = useAccessibility();
  
  // Consolidated menu items with better grouping
  const menuItems = [
    { name: "Home", path: "/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
    
    // Bio & Health section
    { name: "Health Center", path: "/bio-tracking", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg> },
    { name: "Early Warning", path: "/warning-system", icon: <Bell className="h-4 w-4" /> },
    { name: "Environmental", path: "/environmental", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v14"></path><path d="M18 22V4"></path><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2v8z"></path><path d="M6 10V4a2 2 0 0 1 2-2h2"></path><path d="M10 2v8"></path></svg> },
    
    // Insights & Tracking
    { name: "Emotion Hub", path: "/emotion-hub", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> },
    { name: "Sensory Profile", path: "/sensory-profile", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg> },
    
    // Daily Tools
    { name: "Daily Routine", path: "/routine", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> },
    { name: "Focus Mode", path: "/focus", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" x2="9.17" y1="4.93" y2="9.17"></line><line x1="14.83" x2="19.07" y1="14.83" y2="19.07"></line><line x1="14.83" x2="19.07" y1="9.17" y2="4.93"></line><line x1="14.83" x2="18.36" y1="9.17" y2="5.64"></line><line x1="4.93" x2="9.17" y1="19.07" y2="14.83"></line></svg> },
    { name: "Journal", path: "/journal", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path><line x1="9" y1="9" x2="10" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg> },
    
    // Support & Resources
    { name: "Resource Library", path: "/resource-library", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> },
    { name: "SOS History", path: "/sos-history", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 8 12 12 14 14"></polyline><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path></svg> },
    
    // Account & Settings
    { name: "Profile", path: "/profile-account", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
    { name: "Accessibility", path: "/settings/accessibility", icon: <Accessibility className="h-4 w-4" /> },
    { name: "Notifications", path: "/notification-center", icon: <Bell className="h-4 w-4" /> },
    { name: "Settings", path: "/settings", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg> },
  ];
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="py-6">
          <h2 className="text-2xl font-bold mb-6 px-2">Hana</h2>
          
          {/* Grouped sections with headers */}
          <div className="space-y-6">
            <div>
              <h3 className="px-4 text-xs uppercase text-gray-500 font-semibold mb-2">Main</h3>
              <div className="space-y-1">
                {menuItems.slice(0, 1).map((item) => (
                  <Button 
                    key={item.path} 
                    variant="ghost" 
                    className="w-full justify-start text-base py-3"
                    onClick={() => navigate(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="px-4 text-xs uppercase text-gray-500 font-semibold mb-2">Health & Monitoring</h3>
              <div className="space-y-1">
                {menuItems.slice(1, 4).map((item) => (
                  <Button 
                    key={item.path} 
                    variant="ghost" 
                    className="w-full justify-start text-base py-3"
                    onClick={() => navigate(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="px-4 text-xs uppercase text-gray-500 font-semibold mb-2">Insights & Personal</h3>
              <div className="space-y-1">
                {menuItems.slice(4, 6).map((item) => (
                  <Button 
                    key={item.path} 
                    variant="ghost" 
                    className="w-full justify-start text-base py-3"
                    onClick={() => navigate(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="px-4 text-xs uppercase text-gray-500 font-semibold mb-2">Daily Tools</h3>
              <div className="space-y-1">
                {menuItems.slice(6, 9).map((item) => (
                  <Button 
                    key={item.path} 
                    variant="ghost" 
                    className="w-full justify-start text-base py-3"
                    onClick={() => navigate(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="px-4 text-xs uppercase text-gray-500 font-semibold mb-2">Support</h3>
              <div className="space-y-1">
                {menuItems.slice(9, 11).map((item) => (
                  <Button 
                    key={item.path} 
                    variant="ghost" 
                    className="w-full justify-start text-base py-3"
                    onClick={() => navigate(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="px-4 text-xs uppercase text-gray-500 font-semibold mb-2">Account</h3>
              <div className="space-y-1">
                {menuItems.slice(11).map((item) => (
                  <Button 
                    key={item.path} 
                    variant="ghost" 
                    className="w-full justify-start text-base py-3"
                    onClick={() => navigate(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                    {(item.path === '/settings/accessibility' && (highContrastEnabled || reducedMotionEnabled)) && (
                      <span className="ml-auto bg-purple-100 text-purple-800 text-xs rounded-full px-2 py-0.5">
                        Active
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
