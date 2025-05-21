
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface NoteInputProps {
  note: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const NoteInput = ({ note, onChange }: NoteInputProps) => {
  return (
    <Card className="p-4 mb-6">
      <Textarea
        placeholder="Add a note about how you're feeling (optional)"
        value={note}
        onChange={onChange}
        className="resize-none border-none focus-visible:ring-0"
        rows={5}
      />
    </Card>
  );
};
