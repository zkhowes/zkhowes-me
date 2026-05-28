import NotebookShell from "@/components/NotebookShell";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

/**
 * Main site layout — wraps every route except the (bare) for-sale listing
 * with the notebook shell, sidebar nav, and ZKHOWES header.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotebookShell>
      {/* Left column: nav only, anchored to top */}
      <aside
        style={{ width: "210px", flexShrink: 0 }}
        className="flex flex-col px-4 pt-6 pb-4"
      >
        <Nav />
      </aside>

      {/* Right column: horizontal ZKHOWES header on top, then page content */}
      <main className="flex-1 flex flex-col gap-6 p-6">
        <Header />
        {children}
      </main>
    </NotebookShell>
  );
}
