import Column from "./Column";

const Board = () => {
  return (
    <div className="flex space-x-4 p-4 bg-gray-100 min-h-screen">
      <Column title="To Do" />
      <Column title="In Progress" />
      <Column title="Done" />
    </div>
  );
};

export default Board;
