import { Field, Label, Checkbox as HeadlessCheckbox } from '@headlessui/react';

type Props = {
  label?: string;
  options?: IOption[];
  required?: boolean;
};

const Checkbox = ({ label, options, required }: Props) => {
  return (
    <Field className="mb-5">
      <Label className="text-lg text-slate-700">
        {label}
        {required && (
          <span className="italic text-sm text-slate-500">{' (required)'}</span>
        )}
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-2 mb-5">
        {options?.map((option) => (
          <Field key={option.id}>
            <HeadlessCheckbox className="inline-block group size-4 mr-2 rounded border bg-white data-[checked]:bg-blue-500" />
            <Label className="text-lg text-slate-700">{option.label}</Label>
          </Field>
        ))}
      </div>
    </Field>
  );
};

export default Checkbox;
