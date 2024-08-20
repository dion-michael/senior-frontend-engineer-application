interface IOption {
  label: string;
  value: string | number;
  id: string;
}

interface IQuestion {
  id: string;
  question_type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: IOption[];
}

type IQuestionKey = keyof IQuestion;

interface ISection {
  id: string;
  section_name: string;
  questions: IQuestion[];
}

interface IForm {
  id: string;
  form_name: string;
  description?: string;
  sections: ISection[];
  created_at: string;
  updated_at: string;
}

interface GetAllFormsParams {
  page?: number;
  limit?: number;
  sorting?: { id: string; desc: boolean }[];
  query?: string;
}

interface IFormResponse {
  pageCount: number;
  data: IForm[];
}

type GenericObject = Record<string, unknown>;
