import Navbar from "./Navbar";

import CustomerSidebar from "./CustomerSidebar";

function CustomerLayout({ children }) {

  return (

    <>

      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 70px)"
        }}
      >

        <CustomerSidebar />

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

export default CustomerLayout;