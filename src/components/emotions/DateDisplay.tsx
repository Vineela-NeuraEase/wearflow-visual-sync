
interface DateDisplayProps {
  formattedDate: string;
}

export const DateDisplay = ({ formattedDate }: DateDisplayProps) => {
  return (
    <div className="text-center text-gray-600 mb-6">
      {formattedDate}
    </div>
  );
};
