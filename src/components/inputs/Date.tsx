import { Field, Input, Label } from '@headlessui/react';

type Props = {
  label?: string;
  required?: boolean;
};

const Date = ({ label, required }: Props) => {
  return (
    <Field className="mb-5">
      <Label className="text-lg text-slate-700">
        {label}
        {required && (
          <span className="italic text-sm text-slate-500">{' (required)'}</span>
        )}
      </Label>
      <Input
        type="date"
        className="w-full border border-slate-400 rounded-md p-4 text-lg text-slate-700"
      />
    </Field>
  );
};

export default Date;
