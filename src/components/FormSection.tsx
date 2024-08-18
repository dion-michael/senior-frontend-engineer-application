import React from 'react';
import FormSectionTitle from './FormSectionTitle';
import FormSectionQuestion from './FormSectionQuestion';

interface Props {
  section: ISection;
}

const FormSection: React.FC<Props> = ({ section }) => {
  return (
    <div className="mb-10">
      <FormSectionTitle>{section.section_name}</FormSectionTitle>
      {section.questions.map((question) => (
        <FormSectionQuestion key={question.id} question={question} />
      ))}
    </div>
  );
};

export default FormSection;
