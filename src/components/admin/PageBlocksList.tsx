import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { GripVertical, Edit, Trash2, Eye, EyeOff, Type, Image, LayoutGrid, Megaphone, Users, MessageSquare, Map, Video, BarChart3, Quote, ListCollapse, Layers } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type PageBlock = Database['public']['Tables']['page_blocks']['Row'];
type BlockType = Database['public']['Enums']['block_type'];

interface PageBlocksListProps {
  blocks: PageBlock[];
  onReorder: (blocks: PageBlock[]) => void;
  onEdit: (block: PageBlock) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (block: PageBlock) => void;
}

const blockIcons: Record<BlockType, React.ReactNode> = {
  hero: <LayoutGrid className="h-4 w-4" />,
  text: <Type className="h-4 w-4" />,
  image: <Image className="h-4 w-4" />,
  gallery: <Layers className="h-4 w-4" />,
  cards: <LayoutGrid className="h-4 w-4" />,
  cta: <Megaphone className="h-4 w-4" />,
  news_feed: <LayoutGrid className="h-4 w-4" />,
  leadership: <Users className="h-4 w-4" />,
  contact_form: <MessageSquare className="h-4 w-4" />,
  map: <Map className="h-4 w-4" />,
  accordion: <ListCollapse className="h-4 w-4" />,
  tabs: <Layers className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  stats: <BarChart3 className="h-4 w-4" />,
  testimonials: <Quote className="h-4 w-4" />,
};

interface SortableBlockProps {
  block: PageBlock;
  onEdit: (block: PageBlock) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (block: PageBlock) => void;
}

const SortableBlock = ({ block, onEdit, onDelete, onToggleVisibility }: SortableBlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-card rounded-lg border p-4 flex items-center gap-4 ${!block.is_visible ? 'opacity-50' : ''}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab hover:bg-muted p-1 rounded"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {blockIcons[block.block_type]}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{block.title || block.block_type}</p>
        <p className="text-sm text-muted-foreground capitalize">{block.block_type.replace('_', ' ')}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleVisibility(block)}
          title={block.is_visible ? 'Hide' : 'Show'}
        >
          {block.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit(block)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(block.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const PageBlocksList = ({ blocks, onReorder, onEdit, onDelete, onToggleVisibility }: PageBlocksListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      const newBlocks = arrayMove(blocks, oldIndex, newIndex);
      onReorder(newBlocks);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleVisibility={onToggleVisibility}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default PageBlocksList;
