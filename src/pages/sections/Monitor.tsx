
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, BarChart2, AlertTriangle } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";
import { motion } from "framer-motion";
import { EarlyWarningSystem } from "@/components/warning-system/EarlyWarningSystem";
import { PersonalizedStrategies } from "@/components/warning-system/PersonalizedStrategies";
import { BluetoothDeviceManager } from "@/components/BluetoothDeviceManager";
import { useBiometricData } from "@/hooks/useBiometricData";

const Monitor = () => {
  const navigate = useNavigate();
  const [showStrategies, setShowStrategies] = useState(false);
  const [showDeviceManager, setShowDeviceManager] = useState(false);
  
  // Use our biometric data hook for consistent data across components
  const {
    isConnected,
    dataPoints,
    addDataPoint,
    connectDevice
  } = useBiometricData();
  
  const monitorTools = [
    {
      title: "Emotion Hub",
      description: "Track your emotions",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      path: "/emotion-hub",
      color: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "Body Stats",
      description: "Physical measurements",
      icon: <Activity className="h-6 w-6 text-green-500" />,
      path: "/body-stats",
      color: "bg-green-100 dark:bg-green-900/30"
    },
    {
      title: "Environment",
      description: "Track external triggers",
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      path: "/environmental",
      color: "bg-amber-100 dark:bg-amber-900/30"
    },
    {
      title: "Bio Tracking",
      description: "Monitor vitals",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      path: "/bio-tracking",
      color: "bg-red-100 dark:bg-red-900/30"
    }
  ];
  
  // Handle data from BluetoothDeviceManager
  const handleDataReceived = (data: any) => {
    addDataPoint(data);
  };
  
  // Handle device connection
  const handleDeviceConnected = (device: any) => {
    connectDevice(device);
    setShowDeviceManager(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium">Monitor</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Track your wellbeing</p>
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {showDeviceManager ? (
          <Card className="p-5">
            <h2 className="text-lg font-semibold mb-4">Connect Wearable Device</h2>
            <BluetoothDeviceManager 
              onDeviceConnected={handleDeviceConnected}
              onDataReceived={handleDataReceived}
            />
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setShowDeviceManager(false)}
            >
              Cancel
            </Button>
          </Card>
        ) : showStrategies ? (
          <PersonalizedStrategies 
            onClose={() => setShowStrategies(false)} 
            warningLevel="watch"
          />
        ) : (
          <EarlyWarningSystem 
            onShowStrategies={() => setShowStrategies(true)}
          />
        )}
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {monitorTools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card 
              className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-2 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              onClick={() => navigate(tool.path)}
            >
              <div className="flex items-center">
                <div className={`${tool.color} p-3 rounded-full mr-3`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-medium text-base">{tool.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {isConnected ? (
          <Button
            variant="outline"
            className="w-full py-3 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
            onClick={() => navigate("/warning-system")}
          >
            <motion.div
              className="text-green-600 dark:text-green-400"
            >
              Device Connected - View Warning System
            </motion.div>
          </Button>
        ) : (
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full py-3 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
              onClick={() => setShowDeviceManager(true)}
            >
              <motion.div
                className="text-blue-600 dark:text-blue-400"
              >
                Connect Wearable Device
              </motion.div>
            </Button>
            <Button
              variant="outline"
              className="w-full py-3 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20"
              onClick={() => navigate("/warning-system")}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-red-600 dark:text-red-400"
              >
                Warning System
              </motion.div>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Monitor;
