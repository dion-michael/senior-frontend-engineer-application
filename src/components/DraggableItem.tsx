import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PropsWithChildren } from 'react';

interface DraggableItemProps extends PropsWithChildren {
  id: string;
  className?: string;
}

const DraggableItem = ({ children, id, className }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      id={id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
