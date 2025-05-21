
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
        <div className="relative w-[280px] h-[280px]">
          {toolOptions.map((tool, index) => (
            <ToolButton
              key={tool.path}
              tool={tool}
              index={index}
              onClick={() => handleNavigation(tool.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolCircle;
