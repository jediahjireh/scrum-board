export interface Task {
  id: string;
  status: string;
  name: string;
}

export interface BoardProps {
  tasks: Task[];
  id: string;
  name: string;
}

export interface ColumnProps {
  title: string;
  tasks: Task[];
  droppableId: string;
}
