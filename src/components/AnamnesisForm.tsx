import FormPaper from './FormPaper';
import FormTitle from './FormTitle';
import FormDescription from './FormDescription';
import FormSection from './FormSection';
import Edit from './icons/Edit';
import ButtonGroup from './ButtonGroup';
import Button from './Button';
import AnamnesisEditForm from './AnamnesisEditForm';
import { Suspense, useCallback, useEffect } from 'react';
import useAnamnesisForm from '../hooks/useAnamnesisForm';
import { deleteForm, updateForm } from '../api/forms';

type Props = {
  formId?: string;
  edit?: boolean;
  onEditChange: (param: boolean) => void;
  onSaved: () => void;
  onDeleted: () => void;
};

const AnamnesisForm = ({
  formId,
  edit,
  onEditChange,
  onSaved,
  onDeleted
}: Props) => {
  const { form, refetch } = useAnamnesisForm(formId);

  useEffect(() => {
    return () => onEditChange(false);
  }, [onEditChange]);

  const handleOnSaved = useCallback(
    async (form: IForm) => {
      form.updated_at = new Date().toISOString();
      await updateForm(form);
      refetch();
      onSaved();
    },
    [onSaved, refetch]
  );

  const handleOnDeleted = useCallback(
    async (form: IForm) => {
      await deleteForm(form.id);
      onDeleted();
    },
    [onDeleted]
  );

  return (
    <Suspense fallback={<span>loading...</span>}>
      {!edit && (
        <ButtonGroup className="flex bg-transparent">
          <Button
            onClick={() => onEditChange(true)}
            className="flex items-center rounded-lg hover:bg-blue-50 active:bg-blue-100"
          >
            <Edit className="mr-1 size-6" /> {'Edit'}
          </Button>
        </ButtonGroup>
      )}
      {edit ? (
        <AnamnesisEditForm
          onCancel={() => onEditChange(false)}
          onSaved={handleOnSaved}
          onDeleted={handleOnDeleted}
          form={form}
        />
      ) : (
        <FormPaper>
          <FormTitle>{form?.form_name}</FormTitle>
          <FormDescription>{form?.description}</FormDescription>
          {form?.sections.map((section) => (
            <FormSection key={section.id} section={section} />
          ))}
        </FormPaper>
      )}
    </Suspense>
  );
};

export default AnamnesisForm;
