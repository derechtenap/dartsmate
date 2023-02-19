type Props = {
  children: React.ReactNode;
};

const SlideContainer = ({ children }: Props) => {
  return (
    <div className="flex h-full items-center p-16">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default SlideContainer;
