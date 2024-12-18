import RenameBoardModal from "../(modals)/RenameBoardModal";
import Navbar from "./_component/Navbar";
import OrganisationBar from "./_component/OrganisationBar";
import Sidebar from "./_component/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full flex">
      <aside className="h-full w-[60px] bg-blue-950 text-white py-4 flex justify-center px-4 z-[1]">
        <Sidebar />
      </aside>
      <div className=" h-full flex flex-1">
        <OrganisationBar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <RenameBoardModal />
          <div className="p-4 flex justify-between   h-[calc(100vh-104px)] overflow-y-scroll no-scrollbar ">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
