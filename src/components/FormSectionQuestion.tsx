import { useMemo } from 'react';
import Radio from './inputs/Radio';
import Checkbox from './inputs/Checkbox';
import TextArea from './inputs/TextArea';
import Date from './inputs/Date';
import Input from './inputs/Input';

type Props = {
  question: IQuestion;
};

const FormSectionQuestion = ({ question }: Props) => {
  const questionField = useMemo(() => {
    switch (question.question_type) {
      case 'text':
        return (
          <Input
            label={question.label}
            required={question.required}
            placeholder={question.placeholder}
          />
        );
      case 'date':
        return <Date label={question.label} required={question.required} />;
      case 'textarea':
        return (
          <TextArea
            label={question.label}
            required={question.required}
            placeholder={question.placeholder}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            label={question.label}
            options={question.options}
            required={question.required}
          />
        );
      case 'radio':
        return (
          <Radio
            label={question.label}
            options={question.options}
            required={question.required}
          />
        );
    }
  }, [question]);
  return <div>{questionField}</div>;
};

export default FormSectionQuestion;
