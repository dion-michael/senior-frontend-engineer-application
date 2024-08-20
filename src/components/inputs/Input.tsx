import {
  Field,
  Label,
  Input as HeadlessInput,
  InputProps,
  FieldProps
} from '@headlessui/react';

interface Props extends InputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  containerProps?: FieldProps;
}

const Input = ({
  label,
  required,
  placeholder,
  containerProps,
  ...props
}: Props) => {
  return (
    <Field {...containerProps} className={`mb-5 ${containerProps?.className}`}>
      <Label className="text-lg text-slate-700">
        {label}{' '}
        {required && (
          <span className="italic text-sm text-slate-500">{' (required)'}</span>
        )}
      </Label>
      <HeadlessInput
        {...props}
        placeholder={placeholder}
        required={required}
        className="w-full border border-slate-400 rounded-md p-4 text-lg text-slate-700"
      />
    </Field>
  );
};

export default Input;
