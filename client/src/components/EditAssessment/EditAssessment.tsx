import { Input, TextArea } from "../../components/TextInputs";
import { Assessment } from "../../logic/icsGen";

import blob from "./blob-small.svg";

interface EditAssessmentProps {
  assessment: Assessment;
  onAssessmentChange: (assessment: Assessment) => void;
}

const EditAssessment = ({
  assessment,
  onAssessmentChange,
}: EditAssessmentProps) => {
  const onWeightChange = (v: string) => {
    if (isNaN(Number(v.trim()))) {
      return;
    }
    if (v.trim() === "") {
      onAssessmentChange({ ...assessment, weight: 0 });
      return;
    }
    onAssessmentChange({
      ...assessment,
      weight: Number(v.trim()),
    });
  };

  const jsxInputFormat = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="flex flex-col gap-4 text-on-surface">
      <div className="flex flex-row w-full space-x-2">
        <BlobIcon icon="label" />

        <div className="flex flex-col w-full space-y-3">
          <Input
            label="Name"
            value={assessment.name}
            onValueChange={(v) =>
              onAssessmentChange({ ...assessment, name: v })
            }
          />
          <Input
            label="Date"
            value={jsxInputFormat(assessment.date)}
            onValueChange={(v) =>
              onAssessmentChange({ ...assessment, date: new Date(v) })
            }
            leadingIcon="event"
          />
        </div>
      </div>

      <div className="flex flex-row w-full space-x-2">
        <BlobIcon icon="text_snippet" />

        <div className="flex flex-col w-full space-y-3">
          <Input
            label="Weight"
            value={assessment.weight}
            onValueChange={onWeightChange}
            leadingIcon="percent"
          />
          <Input
            label="Location"
            value={assessment.location}
            onValueChange={(v) =>
              onAssessmentChange({ ...assessment, location: v })
            }
            leadingIcon="location_on"
          />
        </div>
      </div>

      <div className="flex flex-row w-full space-x-2">
        <BlobIcon icon="speaker_notes" />

        <div className="flex flex-col w-full space-y-3">
          <TextArea
            label="Notes"
            value={assessment.notes}
            onValueChange={(v) =>
              onAssessmentChange({ ...assessment, notes: v })
            }
            className="h-24"
          />
        </div>
      </div>
    </div>
  );
};

export default EditAssessment;

const BlobIcon = ({ icon }: { icon: string }) => {
  return (
    <div className="relative w-14 h-12 flex flex-row justify-center items-center">
      <img
        src={blob}
        alt="icon background"
        className="absolute top-0 left-0 h-12"
      />
      <div className="material-symbols-outlined text-primary text-xl">
        {icon}
      </div>
    </div>
  );
};
