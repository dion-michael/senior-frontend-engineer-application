import { useCallback, useMemo, useState } from 'react';
import './App.css';
import {
  ColumnDef,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table';
import { formatDate } from './utils/formatDate';
import Table from './components/Table';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react';
import EllipsisY from './components/icons/EllipsisY';
import { useFormsData } from './hooks/useFormsData';
import SearchInput from './components/SearchInput';
import AppBanner from './components/AppBanner';
import FullscreenDialog from './components/FullscreenDialog';
import AnamnesisForm from './components/AnamnesisForm';
import Add from './components/icons/Add';

const columnHelper = createColumnHelper<IForm>();

function App() {
  const [selected, setSelected] = useState<IForm | null>(null);
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [query, setQuery] = useState('');
  const [editing, setIsEditing] = useState(false);

  const {
    data,
    fetchData,
    loading,
    nextPage,
    prevPage,
    page,
    limit,
    pageCount,
    addForm
  } = useFormsData({ page: 1, limit: 5, sorting, query });

  const openDetail = (form: IForm) => {
    setSelected(form);
    setOpen(true);
  };

  const onClose = () => {
    // setSelected(null);
    setOpen(false);
  };

  const columns: ColumnDef<IForm>[] = useMemo(
    () => [
      {
        accessorKey: 'form_name',
        header: 'Form name',
        cell: (props) => {
          return (
            <>
              <span
                className="font-bold underline sm:no-underline sm:hover:underline cursor-pointer"
                onClick={() => openDetail(props.row.original)}
              >
                {props.row.getValue(props.column.id)}
              </span>
              <span className="block sm:hidden italic">
                {props.row.original.description}
              </span>
            </>
          );
        }
      },
      {
        accessorKey: 'description',
        header: () => (
          <span className="font-bold sm:inline-block hidden">Description</span>
        ),
        cell: (props) => (
          <span className="hidden sm:inline-block">{`${props.getValue()}`}</span>
        )
      },
      {
        accessorKey: 'created_at',
        header: () => (
          <span className="font-bold sm:inline-block hidden">Created</span>
        ),
        accessorFn: (value) => formatDate(value.created_at),
        cell: (props) => (
          <span className="hidden sm:inline-block">{`${props.getValue()}`}</span>
        )
      },
      {
        accessorKey: 'updated_at',
        header: () => (
          <span className="font-bold sm:inline-block hidden">Last update</span>
        ),
        accessorFn: (value) => formatDate(value.updated_at),
        cell: (props) => (
          <span className="hidden sm:inline-block">{`${props.getValue()}`}</span>
        )
      },
      columnHelper.display({
        id: 'actions',
        cell: (props) => (
          <Menu>
            <MenuButton className="data[active]:bg-blue-100">
              <EllipsisY />
            </MenuButton>
            <MenuItems
              className="bg-white border border-gray-200 drop-shadow-md w-40"
              anchor="left start"
            >
              <MenuItem>
                <a
                  className="block data-[focus]:bg-blue-100 p-4 border-b border-b-slate-100"
                  role="button"
                  onClick={() => openDetail(props.row.original)}
                >
                  View
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  className="block data-[focus]:bg-blue-100 p-4 border-b border-b-slate-100"
                  role="button"
                  onClick={() => {
                    setIsEditing(true);
                    openDetail(props.row.original);
                  }}
                >
                  Edit
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  className="block data-[focus]:bg-blue-100 p-4 border-b border-b-slate-100"
                  href="/license"
                >
                  Delete
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        )
      })
    ],
    []
  );

  const closeDialogAndRefetch = useCallback(() => {
    fetchData();
    setOpen(false);
    setIsEditing(false);
  }, [fetchData]);

  const handleAddForm = useCallback(async () => {
    const response = await addForm();
    setSelected(response);
    setIsEditing(true);
    setOpen(true);
  }, [addForm]);

  return (
    <div className="mx-auto">
      <AppBanner>
        <SearchInput
          placeholder="search here"
          onChange={(e) => setQuery(e.target.value)}
        />
      </AppBanner>
      <div className="container mx-auto sm:w-full md:w-4/5 px-4 md:px-0 -mt-16">
        <Table
          columns={columns}
          data={data}
          loading={loading}
          className="w-full max-w-screen-lg mx-auto bg-white rounded-lg drop-shadow-md"
          pagination={{
            nextPage,
            prevPage,
            page,
            limit,
            pageCount
          }}
          onRowDoubleClick={(form: IForm) => openDetail(form)}
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <div className="mt-5 flex justify-end">
          <Button
            onClick={handleAddForm}
            className="flex items-center text-lg bg-blue-500 hover:bg-blue-700 active:bg-blue-800 p-4 text-white rounded-lg"
          >
            <Add className="mr-2" /> {'Add Form'}
          </Button>
        </div>
      </div>
      <FullscreenDialog onClose={onClose} open={open} title={'Form Preview'}>
        <AnamnesisForm
          formId={selected?.id}
          edit={editing}
          onEditChange={setIsEditing}
          onSaved={closeDialogAndRefetch}
          onDeleted={closeDialogAndRefetch}
        />
      </FullscreenDialog>
    </div>
  );
}

export default App;
