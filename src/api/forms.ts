import addMinutes from '../utils/addMinutes';

const cacheStaleTime = 0.5; // 5 minutes

interface IExpiryTime {
  expiryTime: number;
}

type IFormCache = IExpiryTime & IFormResponse;

export const getAllForms: (
  params: GetAllFormsParams
) => Promise<IFormResponse> = async (
  { page, limit, sorting, query } = { page: 1, limit: 10 }
) => {
  const { id: _sort, desc } = sorting && sorting.length ? sorting[0] : {};
  const queryString = serialize(
    cleanObject({
      _page: page,
      _limit: limit,
      _sort,
      _order: desc === undefined ? undefined : desc ? 'desc' : 'asc',
      form_name_like: query
    })
  );

  const cache = readFromCache(queryString);
  if (cache) {
    const now = new Date().getTime();
    if (cache.expiryTime && now < cache.expiryTime) {
      const cacheCopy = { ...cache } as Partial<IFormCache>;
      delete cacheCopy.expiryTime;
      return cache as IFormResponse;
    }
    invalidateCache(queryString);
  }

  const response = await fetch(`http://localhost:3000/forms?${queryString}`);
  const data = await response.json();
  const pageCount = Math.ceil(
    Number(response.headers.get('x-total-count')) / (limit || 1)
  );
  const expire = addMinutes(new Date(), cacheStaleTime).getTime();
  writeToCache(queryString, { data, pageCount }, expire);

  return { data, pageCount };
};

export const getFormById: (id: string) => Promise<IForm> = async (id) => {
  const response = await fetch(`http://localhost:3000/forms/${id}`).then(
    (res) => res.json()
  );
  return response;
};

export const createForm: (form: IForm) => Promise<IForm> = async (form) => {
  const response = await fetch(`http://localhost:3000/forms`, {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
  invalidateCache();
  return response;
};

export const updateForm: (form: IForm) => Promise<IForm> = async (form) => {
  const response = await fetch(`http://localhost:3000/forms/${form.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  }).then((res) => res.json());
  invalidateCache();
  return response;
};

export const deleteForm: (formId: string) => Promise<IForm> = async (
  formId
) => {
  const response = await fetch(`http://localhost:3000/forms/${formId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
  invalidateCache();
  return response;
};

const readFromCache = (key: string) => {
  const cache = JSON.parse(localStorage.getItem('forms') || '{}');
  if (cache[key] && cache[key].data.length) {
    return cache[key] as IFormCache;
  }
};

const writeToCache = (
  key: string,
  value: IFormResponse,
  expiryTime: number
) => {
  const cache = JSON.parse(localStorage.getItem('forms') || '{}');
  cache[key] = { expiryTime, ...value };
  localStorage.setItem('forms', JSON.stringify(cache));
};

const invalidateCache = (key?: string) => {
  if (key) {
    const cache = JSON.parse(localStorage.getItem('forms') || '{}');
    delete cache[key];
    localStorage.setItem('forms', JSON.stringify(cache));
  } else {
    localStorage.removeItem('forms');
  }
};

const serialize = (obj: GenericObject) =>
  Object.entries(obj)
    .map((i) =>
      [i[0], encodeURIComponent(i[1] as string | number | boolean)].join('=')
    )
    .join('&');

const cleanObject = (obj: GenericObject) =>
  Object.entries(obj).reduce(
    (result, [key, value]) => (value ? { ...result, [key]: value } : result),
    {}
  );
