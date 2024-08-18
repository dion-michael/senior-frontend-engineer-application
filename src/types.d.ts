interface IQuestion {
  id: uuid;
  question_type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface ISection {
  id: uuid;
  section_name: string;
  questions: IQuestion[];
}

interface IForm {
  id: uuid;
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
