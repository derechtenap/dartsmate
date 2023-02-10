type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return (
    <div className="card w-36 flex-grow cursor-pointer rounded-lg bg-primary text-secondary transition-all hover:scale-[115%] hover:text-white">
      <div className="card-body items-center p-2">{children}</div>
    </div>
  );
};

export default Card;
