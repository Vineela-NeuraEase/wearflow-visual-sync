
import { useNavigate } from "react-router-dom";
import { useAudio } from "@/context/AudioContext";
import { toolOptions } from "@/data/toolOptions";
import ToolButton from "./ToolButton";
import CloseButton from "./CloseButton";

interface ToolCircleProps {
  onClose: () => void;
}

const ToolCircle = ({ onClose }: ToolCircleProps) => {
  const navigate = useNavigate();
  const { play } = useAudio();

  const handleNavigation = (path: string) => {
    play("whoosh");
    navigate(path);
    onClose();
  };

  // Calculate positions in a perfect circle
  const calculatePosition = (index: number, total: number, radius: number) => {
    // Start from the top (270 degrees) and go clockwise
    const angle = (2 * Math.PI * index) / total - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative">
        {/* Center close button */}
        <CloseButton 
          onClick={() => {
            play("click");
            onClose();
          }} 
        />

        {/* Tool buttons in a circle */}
        <div className="relative w-[300px] h-[300px]">
          {toolOptions.map((tool, index) => {
            const position = calculatePosition(index, toolOptions.length, 130);
            return (
              <div
                key={tool.path}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                }}
              >
                <ToolButton
                  tool={tool}
                  index={index}
                  onClick={() => handleNavigation(tool.path)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolCircle;
