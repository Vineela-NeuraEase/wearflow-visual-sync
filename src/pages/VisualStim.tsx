
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const VisualStim = () => {
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(65);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reqAnimRef = useRef<number | null>(null);
  
  // Initialize canvas animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Bubble objects
    type Bubble = {
      x: number;
      y: number;
      radius: number;
      color: string;
      dx: number;
      dy: number;
      opacity: number;
      growth: number;
    };
    
    const bubbles: Bubble[] = [];
    const colors = ['#D0E6FF', '#E9DFFF', '#FFE0EF', '#D5F5E3'];
    
    // Create initial bubbles
    const createBubbles = () => {
      const numBubbles = 5 + Math.floor(intensity / 10);
      
      for (let i = 0; i < numBubbles; i++) {
        const radius = 30 + Math.random() * 70;
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          dx: (Math.random() - 0.5) * 1,
          dy: (Math.random() - 0.5) * 1,
          opacity: 0.3 + Math.random() * 0.5,
          growth: Math.random() * 0.2 - 0.1,
        });
      }
    };
    
    createBubbles();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update each bubble
      bubbles.forEach(bubble => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color + Math.floor(bubble.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Update position
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;
        
        // Bounce off edges
        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) {
          bubble.dx = -bubble.dx;
        }
        
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) {
          bubble.dy = -bubble.dy;
        }
        
        // Change size slightly
        bubble.radius += bubble.growth;
        
        // Change direction occasionally
        if (Math.random() < 0.02) {
          bubble.dx = (Math.random() - 0.5) * 2;
          bubble.dy = (Math.random() - 0.5) * 2;
        }
        
        // Reverse growth if too big or small
        if (bubble.radius > 100 || bubble.radius < 20) {
          bubble.growth = -bubble.growth;
        }
      });
      
      reqAnimRef.current = requestAnimationFrame(animate);
    };
    
    reqAnimRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (reqAnimRef.current) {
        cancelAnimationFrame(reqAnimRef.current);
      }
    };
  }, [intensity]);
  
  return (
    <div className="h-screen relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-gradient-to-br from-calm-purple to-calm-pink"></canvas>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="bg-white rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Intensity</span>
            <span className="font-medium">{intensity}%</span>
          </div>
          
          <Slider
            value={[intensity]}
            onValueChange={(value) => setIntensity(value[0])}
            max={100}
            step={1}
            className="mb-6"
          />
          
          <Button 
            className="w-full bg-white border border-gray-300"
            onClick={() => navigate('/tools')}
          >
            <X className="mr-2 h-4 w-4" /> Exit Visual Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualStim;
