import React, { useCallback, useEffect, useState } from 'react';
import { deleteForm, getFormById, updateForm } from '../api/forms';
import getRandomId from '../utils/getRandomId';

const useAnamnesisForm = (formId?: string) => {
  const [form, setForm] = useState<IForm | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchForm = useCallback(async () => {
    try {
      if (formId) {
        setLoading(true);
        const data = await getFormById(formId);
        setForm(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [formId]);

  const saveForm = useCallback(async () => {
    const response = await updateForm(form as IForm);
    return response;
  }, [form]);

  const removeForm = useCallback(async () => {
    const response = await deleteForm(form?.id as string);
    return response;
  }, [form]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const handleFormChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setForm((form) => ({
      ...(form as IForm),
      [e.target.name]: e.target.value
    }));
  };

  const handleSectionNameChange = useCallback(
    (sectionId: string, value: string) => {
      const newForm = { ...form } as IForm;
      const section = newForm.sections.find(
        (section) => section.id === sectionId
      ) as ISection;
      section.section_name = value;
      setForm(newForm);
    },
    [form]
  );

  const handleSectionQuestionChange = useCallback(
    (sectionId: string, questionId: string, key: string, value: string) => {
      const newForm = { ...form } as IForm;

      const section = newForm.sections.find((section) => {
        return section.id === sectionId;
      }) as ISection;

      const question = section.questions.find(
        (question) => question.id === questionId
      ) as unknown as GenericObject;
      question[key] = ['true', 'false'].includes(value)
        ? value === 'true'
        : value;
      setForm(newForm);
    },
    [form]
  );

  const handleOptionChange = useCallback(
    (
      sectionId: string,
      questionId: string,
      optionId: string,
      value: string
    ) => {
      const newForm = { ...form } as IForm;
      const section = newForm.sections.find(
        (section) => section.id === sectionId
      ) as ISection;
      const question = section.questions.find(
        (question) => question.id === questionId
      ) as IQuestion;
      const option = question.options?.find(
        (option) => option.id === optionId
      ) as IOption;
      option.label = value;
      option.value = value;
      setForm(newForm);
    },
    [form]
  );

  const handleAddOption = useCallback(
    (sectionId: string, questionId: string) => {
      const newForm = { ...form } as IForm;
      const newOption: IOption = {
        id: getRandomId(),
        value: '',
        label: ''
      };
      const section = newForm.sections.find(
        (section) => section.id === sectionId
      ) as ISection;
      const question = section.questions.find(
        (question) => question.id === questionId
      ) as IQuestion;
      if (question.options) {
        question.options.push(newOption);
      } else question.options = [newOption];
      setForm(newForm);
    },
    [form]
  );

  const handleDeleteOption = useCallback(
    (sectionId: string, questionId: string, optionId: string) => {
      const newForm = { ...form } as IForm;
      const section = newForm.sections.find(
        (section) => section.id === sectionId
      ) as ISection;
      const question = section.questions.find(
        (question) => question.id === questionId
      ) as IQuestion;
      const newOptions = question.options?.filter(
        (option) => option.id !== optionId
      );
      question.options = newOptions;
      setForm(newForm);
    },
    [form]
  );

  const handleDeleteSection = useCallback(
    (sectionId: string) => {
      const newForm = { ...form } as IForm;
      const newSections = newForm.sections.filter(
        (section) => section.id !== sectionId
      );
      newForm.sections = newSections;
      setForm(newForm);
    },
    [form]
  );

  const handleAddNewSection = useCallback(() => {
    const copyForm = { ...form } as IForm;
    const newSection: ISection = {
      id: getRandomId(),
      section_name: 'new section',
      questions: []
    };
    copyForm.sections.push(newSection);
    setForm(copyForm);
  }, [form]);

  const handleAddNewQuestion = useCallback(
    (sectionId: string) => {
      const newQuestion: IQuestion = {
        id: getRandomId(),
        label: '',
        question_type: 'text'
      };
      const copyForm = { ...form } as IForm;
      const section = copyForm.sections.find(
        (section) => section.id === sectionId
      ) as ISection;
      section.questions.push(newQuestion);
      setForm(copyForm);
    },
    [form]
  );

  const handleDeleteQuestion = useCallback(
    (sectionId: string, questionId: string) => {
      const copyForm = { ...form } as IForm;
      const section = copyForm.sections.find(
        (section) => section.id === sectionId
      ) as ISection;
      const newQuestions = section.questions.filter(
        (question) => question.id !== questionId
      );
      section.questions = newQuestions;
      setForm(copyForm);
    },
    [form]
  );

  return {
    form,
    refetch: fetchForm,
    saveForm,
    deleteForm: removeForm,
    loading,
    error,
    handleAddNewQuestion,
    handleAddNewSection,
    handleAddOption,
    handleDeleteOption,
    handleDeleteQuestion,
    handleDeleteSection,
    handleFormChange,
    handleOptionChange,
    handleSectionNameChange,
    handleSectionQuestionChange
  };
};

export default useAnamnesisForm;
