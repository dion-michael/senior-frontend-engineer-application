import { PropsWithChildren } from 'react';

const FormSectionTitle = (props: PropsWithChildren) => {
  return <h3 className="section-title mb-5">{props.children}</h3>;
};

export default FormSectionTitle;
