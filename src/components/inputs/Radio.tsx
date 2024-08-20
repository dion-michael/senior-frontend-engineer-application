import {
  Field,
  Label,
  RadioGroup,
  Radio as HeadlessRadio
} from '@headlessui/react';

type Props = {
  label?: string;
  options?: IOption[];
  required?: boolean;
};

const Radio = ({ label, options, required }: Props) => {
  return (
    <RadioGroup aria-label={label} className="mb-5">
      <Label className="text-lg text-slate-700">
        {label}
        {required && (
          <span className="italic text-sm text-slate-500">{' (required)'}</span>
        )}
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-2 mb-5">
        {options?.map((option) => (
          <Field key={option.id} className="flex">
            <HeadlessRadio
              value={option}
              className="mr-2 group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </HeadlessRadio>
            <Label className="text-lg text-slate-700">{option.label}</Label>
          </Field>
        ))}
      </div>
    </RadioGroup>
  );
};

export default Radio;
