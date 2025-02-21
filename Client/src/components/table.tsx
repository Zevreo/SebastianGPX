type TableProps = {
  head: React.ReactNode;
  body: React.ReactNode[];
};

const Table = ({ head, body }: TableProps) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {head}
      </thead>
      <tbody>
        {body.map((item) => item )}
      </tbody>
    </table>
  );
};

export default Table;
