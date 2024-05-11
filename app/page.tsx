import Pagination from "./Components/Pagination";

interface Props {
  searchParams: { page?: string };
}
export default function Dashboard({ searchParams }: Props) {
  return (
    <Pagination
      currentPage={parseInt(searchParams?.page || "1")}
      itemCount={100}
      pageSize={10}
    />
  );
}
