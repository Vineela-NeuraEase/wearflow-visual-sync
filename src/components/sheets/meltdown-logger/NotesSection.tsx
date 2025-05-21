
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export const NotesSection = ({ notes, setNotes }: NotesSectionProps) => {
  return (
    <Card className="p-4 mb-6">
      <h2 className="text-lg font-medium mb-4">Notes</h2>
      <Textarea
        placeholder="Add any additional notes or observations..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
      />
    </Card>
  );
};
