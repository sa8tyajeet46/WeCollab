import AddOrganisation from "./AddOrganisation";
import OragnisationList from "./List";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-y-4">
      <OragnisationList />
      <AddOrganisation />
    </div>
  );
}
