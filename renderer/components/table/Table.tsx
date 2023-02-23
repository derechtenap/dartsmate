type Props = {
  children: React.ReactNode;
  head: string[];
};

const Table = ({ children, head = [] }: Props) => {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
