import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor as LibKeyboardSensor,
  MouseSensor as LibMouseSensor,
  TouchSensor as LibTouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  TouchEvent
} from 'react';

// Block DnD event propagation if element have "data-no-dnd" attribute
const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
  let cur = event.target as HTMLElement;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement as HTMLElement;
  }

  return true;
};

export class MouseSensor extends LibMouseSensor {
  static activators = [
    { eventName: 'onMouseDown', handler }
  ] as (typeof LibMouseSensor)['activators'];
}

export class TouchSensor extends LibTouchSensor {
  static activators = [
    { eventName: 'onTouchStart', handler }
  ] as (typeof LibTouchSensor)['activators'];
}

export class KeyboardSensor extends LibKeyboardSensor {
  static activators = [
    { eventName: 'onKeyDown', handler }
  ] as (typeof LibKeyboardSensor)['activators'];
}

interface DraggableProps<T> {
  list?: T[];
  onListOrderChange: (newList: T[]) => void;
  children(options: { list: T[] }): React.ReactNode;
}

const Draggable: <T extends { id: string }>(
  props: DraggableProps<T>
) => React.ReactNode = ({ list, children, onListOrderChange }) => {
  const [items, setItems] = useState<typeof list>([]);

  useEffect(() => {
    if (list) {
      setItems(list);
    }
  }, [list]);

  const getPosition = useCallback(
    (id: string | number) => {
      return items!.findIndex((item) => item.id === id);
    },
    [items]
  );

  const handleOnDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id === over?.id) return;
    const copyItems = [...items!];
    const originalPosition = getPosition(active?.id);
    const newPosition = getPosition(over!.id);
    const newArray = arrayMove(copyItems, originalPosition, newPosition);
    setItems(newArray);
    onListOrderChange(newArray);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <DndContext
      onDragEnd={handleOnDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      <SortableContext items={items!} strategy={verticalListSortingStrategy}>
        {children({ list: items! })}
      </SortableContext>
    </DndContext>
  );
};

export default Draggable;
