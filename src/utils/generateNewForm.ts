import getRandomId from './getRandomId';

const generateNewForm: () => IForm = () => {
  const today = new Date().toISOString();
  return {
    id: getRandomId(),
    created_at: today,
    updated_at: today,
    form_name: 'New Form',
    sections: [],
    description: ''
  };
};

export default generateNewForm;
