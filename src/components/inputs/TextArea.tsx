import { Field, Label, Textarea as HeadlessTextArea } from '@headlessui/react';

type Props = {
  label?: string;
  required?: boolean;
  placeholder?: string;
};

const TextArea = ({ label, required, placeholder }: Props) => {
  return (
    <Field className="mb-5">
      <Label className="text-lg text-slate-700">
        {label}
        {required && (
          <span className="italic text-sm text-slate-500">{' (required)'}</span>
        )}
      </Label>
      <HeadlessTextArea
        rows={3}
        placeholder={placeholder}
        required={required}
        className="w-full border border-slate-400 rounded-md p-4 text-lg text-slate-700"
      />
      ;
    </Field>
  );
};

export default TextArea;
