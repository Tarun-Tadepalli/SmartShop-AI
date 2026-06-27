import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 70px)"
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "24px"
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default MainLayout;