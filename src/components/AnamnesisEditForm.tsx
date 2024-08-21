import Input from './inputs/Input';
import TextArea from './inputs/TextArea';
import FormPaper from './FormPaper';
import Select from './inputs/Select';
import Button from './Button';
import Delete from './icons/Delete';
import ButtonGroup from './ButtonGroup';
import { Suspense, useCallback } from 'react';
import { fieldOptions, yesNoOption } from '../configs/constants';
import Save from './icons/Save';
import Cancel from './icons/Cancel';
import useFormState from '../hooks/useFormState';
import Draggable from './Draggable';
import DraggableItem from './DraggableItem';
import Hamburger from './icons/Hamburger';

type Props = {
  onCancel?: () => void;
  onSaved: (form: IForm) => Promise<unknown>;
  onDeleted: (form: IForm) => Promise<unknown>;
  form?: IForm | null;
};

const AnamnesisEditForm = ({ form, ...props }: Props) => {
  const {
    form: formState,
    handleAddNewQuestion,
    handleAddNewSection,
    handleAddOption,
    handleDeleteOption,
    handleDeleteQuestion,
    handleDeleteSection,
    handleFormChange,
    handleOptionChange,
    handleSectionNameChange,
    handleSectionQuestionChange,
    handleOptionOrderChange,
    handleOnQuestionsOrderChange,
    handleOnSectionOrderChange
  } = useFormState(form);

  const handleSave = useCallback(async () => {
    props.onSaved(formState as IForm);
  }, [props, formState]);

  const handleDelete = useCallback(async () => {
    props.onDeleted(formState as IForm);
  }, [props, formState]);

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
          value={formState?.form_name}
          onChange={handleFormChange}
        />
        <TextArea
          label="Description"
          name="description"
          value={formState?.description}
          onChange={handleFormChange}
          className="mb-0"
        />
      </FormPaper>
      <div className="paper-size flex items-center mx-auto border-0 py-6 px-12">
        <h1 className="font-bold text-2xl">{`Sections (${
          formState?.sections?.length || 0
        })`}</h1>
      </div>
      <div className="mb-5 last:mb-0">
        <Draggable
          list={formState?.sections}
          onListOrderChange={handleOnSectionOrderChange}
        >
          {({ list }) =>
            list.map((section) => (
              <DraggableItem id={section.id} key={section.id}>
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
                    data-no-dnd={true}
                    value={section.section_name}
                    onChange={(e) =>
                      handleSectionNameChange(section.id, e.target.value)
                    }
                  />
                  <h1 className="font-bold text-xl my-6">{`Questions (${section.questions.length})`}</h1>
                  <div>
                    <Draggable
                      list={section.questions}
                      onListOrderChange={(newQuestions) =>
                        handleOnQuestionsOrderChange(newQuestions, section.id)
                      }
                    >
                      {({ list }) =>
                        list.map((question) => (
                          <DraggableItem
                            key={question.id}
                            id={question.id}
                            className="border p-6 rounded-lg mb-6 bg-white"
                          >
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
                                  value={question.label}
                                  data-no-dnd={true}
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
                                  value={question.question_type}
                                  data-no-dnd={true}
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
                                {['text', 'textarea'].includes(
                                  question.question_type
                                ) && (
                                  <Input
                                    label="Placeholder"
                                    value={question.placeholder}
                                    data-no-dnd={true}
                                    onChange={(e) =>
                                      handleSectionQuestionChange(
                                        section.id,
                                        question.id,
                                        'placeholder',
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                              </div>
                              <div className="col-span-5 sm:col-span-2">
                                <Select
                                  label="Required"
                                  value={question.required?.toString()}
                                  data-no-dnd={true}
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
                              {['checkbox', 'radio'].includes(
                                question.question_type
                              ) && (
                                <div className="col-span-5 sm:col-span-2">
                                  <h1 className="text-xl mb-4">Options:</h1>
                                  <Draggable
                                    list={question.options}
                                    onListOrderChange={(newOption) =>
                                      handleOptionOrderChange(
                                        newOption,
                                        section.id,
                                        question.id
                                      )
                                    }
                                  >
                                    {({ list }) =>
                                      list.map((option) => (
                                        <DraggableItem
                                          className="flex items-center mb-5"
                                          key={option.id}
                                          id={option.id}
                                        >
                                          <div className="p-2">
                                            <Hamburger className="size-6" />
                                          </div>
                                          <Input
                                            id={option.id}
                                            value={option.value as string}
                                            data-no-dnd={true}
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
                                        </DraggableItem>
                                      ))
                                    }
                                  </Draggable>
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
                          </DraggableItem>
                        ))
                      }
                    </Draggable>
                  </div>
                  <div
                    role="button"
                    onClick={() => handleAddNewQuestion(section.id)}
                    className="bg-blue-500 cursor-pointer py-4 text-center capitalize text-white font-bold rounded-lg hover:bg-blue-700 active:bg-blue-900"
                  >
                    add question
                  </div>
                </FormPaper>
              </DraggableItem>
            ))
          }
        </Draggable>
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
