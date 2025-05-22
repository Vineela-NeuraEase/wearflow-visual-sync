
import { SleepData, SensoryData, RoutineData, BehavioralData } from "@/types/biometric";

export interface SleepTrackerProps {
  onSave: (data: Omit<SleepData, "user_id">) => Promise<any>;
  isLoading: boolean;
}

export interface SensoryTrackerProps {
  onSave: (data: Omit<SensoryData, "user_id">) => Promise<any>;
  isLoading: boolean;
}

export interface RoutineTrackerProps {
  onSave: (data: Omit<RoutineData, "user_id">) => Promise<any>;
  isLoading: boolean;
}

export interface BehavioralTrackerProps {
  onSave: (data: Omit<BehavioralData, "user_id">) => Promise<any>;
  isLoading: boolean;
}
