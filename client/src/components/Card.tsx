type CardProps = {
  text: string;
};

const Card = ({ text }: CardProps) => {
  return (
    <div className="bg-blue-500 text-white p-3 rounded-lg shadow mb-2">
      {text}
    </div>
  );
};

export default Card;
