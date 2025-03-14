import Card from "./Card";

type ColumnProps = {
  title: string;
};

const Column = ({ title }: ColumnProps) => {
  return (
    <div className="w-1/3 bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <Card text="Example Task" />
    </div>
  );
};

export default Column;
