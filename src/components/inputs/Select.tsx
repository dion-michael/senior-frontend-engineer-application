import {
  Field,
  Label,
  SelectProps,
  Select as HeadlessSelect
} from '@headlessui/react';

interface ISelectProps extends SelectProps {
  options: IOption[];
  label?: string;
  required?: boolean;
}

const Select = ({ options, label, required, ...props }: ISelectProps) => {
  // const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <Field>
      <Label className="text-lg text-slate-700">
        {label}{' '}
        {required && (
          <span className="italic text-sm text-slate-500">{' (required)'}</span>
        )}
      </Label>
      <HeadlessSelect
        {...props}
        className="w-full border border-slate-400 rounded-md p-4 text-lg text-slate-700"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </HeadlessSelect>
    </Field>
  );
};

export default Select;
