import Input from './inputs/Input';
import TextArea from './inputs/TextArea';
import FormPaper from './FormPaper';
import Select from './inputs/Select';
import Button from './Button';
import Delete from './icons/Delete';
import ButtonGroup from './ButtonGroup';
import useAnamnesisForm from '../hooks/useAnamnesisForm';
import { Suspense, useCallback } from 'react';
import { fieldOptions, yesNoOption } from '../configs/constants';
import Save from './icons/Save';
import Cancel from './icons/Cancel';

type Props = {
  onCancel?: () => void;
  onSaved: () => void;
  onDeleted: () => void;
  formId: string;
};

const AnamnesisEditForm = (props: Props) => {
  const {
    form,
    saveForm,
    deleteForm,
    refetch,
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
  } = useAnamnesisForm(props.formId);

  const handleSave = useCallback(async () => {
    await saveForm();
    refetch();
    props.onSaved();
  }, [saveForm, refetch, props]);

  const handleDelete = useCallback(async () => {
    await deleteForm();
    props.onDeleted();
  }, [deleteForm, props]);

  return (
    <Suspense fallback={<span>loading...</span>}>
      <ButtonGroup className="flex bg-transparent">
        <Button
          onClick={props.onCancel}
          className="flex items-center rounded-lg"
        >
          <Cancel className="mr-1 size-6" /> {`Cancel`}
        </Button>
        <Button
          onClick={handleSave}
          className="flex items-center bg-blue-500 hover:bg-blue-700 active:bg-blue-900 text-white rounded-lg"
        >
          <Save className="mr-1 size-6" /> {`Save`}
        </Button>
        <Button
          onClick={handleDelete}
          className="flex items-center bg-red-500 hover:bg-red-700 active:bg-red-900 text-white rounded-lg"
        >
          <Delete className="mr-1 size-6" /> {`Delete`}
        </Button>
      </ButtonGroup>
      <FormPaper className="mb-5">
        <Input
          label="Form name"
          name="form_name"
          value={form?.form_name}
          onChange={handleFormChange}
        />
        <TextArea
          label="Description"
          name="description"
          value={form?.description}
          onChange={handleFormChange}
          className="mb-0"
        />
      </FormPaper>
      <div className="paper-size flex items-center mx-auto border-0 py-6 px-12">
        <h1 className="font-bold text-2xl">{`Sections (${
          form?.sections?.length || 0
        })`}</h1>
      </div>
      <div className="mb-5 last:mb-0">
        {form?.sections?.map((section, i) => (
          <FormPaper className="mb-5" key={section.id}>
            <div className="flex justify-end">
              <Button
                onClick={() => handleDeleteSection(section.id)}
                className="flex items-center text-red-500 rounded-lg text-lg"
              >
                <Delete className="pr-2 size-6 text-red-500" />
                Delete Section
              </Button>
            </div>
            <Input
              label="Section name"
              name="section_name"
              value={form?.sections[i].section_name}
              onChange={(e) =>
                handleSectionNameChange(section.id, e.target.value)
              }
            />
            <h1 className="font-bold text-xl my-6">{`Questions (${section.questions.length})`}</h1>
            <div>
              {section.questions.map((question, j) => (
                <div className="border p-6 rounded-lg mb-6">
                  <div className="flex w-full justify-end">
                    <Button
                      onClick={() =>
                        handleDeleteQuestion(section.id, question.id)
                      }
                      className="bg-red-500 text-white rounded-lg hover:bg-red-700 active:bg-red-700"
                    >
                      <Delete />
                    </Button>
                  </div>
                  <div
                    key={question.id}
                    className="grid grid-cols-5 gap-4 mb-5"
                  >
                    <div className="col-span-5 sm:col-span-3 ">
                      <Input
                        key={`${question.id}-label`}
                        label={`Question`}
                        name={'label'}
                        value={form?.sections[i].questions[j].label}
                        onChange={(e) =>
                          handleSectionQuestionChange(
                            section.id,
                            question.id,
                            e.target.name,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-5 sm:col-span-2">
                      <Select
                        options={fieldOptions}
                        label="Type"
                        key={`${question.id}-type`}
                        name={'question_type'}
                        value={form?.sections[i].questions[j].question_type}
                        onChange={(e) =>
                          handleSectionQuestionChange(
                            section.id,
                            question.id,
                            e.target.name,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-5 sm:col-span-3">
                      <Input
                        label="Placeholder"
                        value={question.placeholder}
                        onChange={(e) =>
                          handleSectionQuestionChange(
                            section.id,
                            question.id,
                            'placeholder',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-5 sm:col-span-2">
                      <Select
                        label="Required"
                        value={question.required?.toString()}
                        onChange={(e) =>
                          handleSectionQuestionChange(
                            section.id,
                            question.id,
                            'required',
                            e.target.value
                          )
                        }
                        options={yesNoOption}
                      ></Select>
                    </div>
                    {['checkbox', 'radio'].includes(question.question_type) && (
                      <div className="col-span-5 sm:col-span-2">
                        <h1 className="text-xl mb-4">Options:</h1>
                        {question.options?.map((option) => (
                          <div className="flex items-center" key={option.id}>
                            <Input
                              value={option.value as string}
                              onChange={(e) =>
                                handleOptionChange(
                                  section.id,
                                  question.id,
                                  option.id,
                                  e.target.value
                                )
                              }
                            />
                            <Button
                              onClick={() =>
                                handleDeleteOption(
                                  section.id,
                                  question.id,
                                  option.id
                                )
                              }
                              className="hover:bg-red-50 active:bg-red-100"
                            >
                              <Delete />
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() =>
                            handleAddOption(section.id, question.id)
                          }
                          className="btn-blue text-white"
                        >
                          add option
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              role="button"
              onClick={() => handleAddNewQuestion(section.id)}
              className="bg-blue-500 cursor-pointer py-4 text-center capitalize text-white font-bold rounded-lg hover:bg-blue-700 active:bg-blue-900"
            >
              add question
            </div>
          </FormPaper>
        ))}

        <div
          role="button"
          onClick={handleAddNewSection}
          className="paper-size mx-auto bg-blue-500 cursor-pointer py-4 text-center capitalize text-white font-bold rounded-lg hover:bg-blue-700 active:bg-blue-900"
        >
          add new section
        </div>
      </div>
      <ButtonGroup>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button
          onClick={handleSave}
          className="btn-blue text-white hover:bg-blue-700 active:bg-blue-900"
        >
          Save
        </Button>
      </ButtonGroup>
    </Suspense>
  );
};

export default AnamnesisEditForm;
