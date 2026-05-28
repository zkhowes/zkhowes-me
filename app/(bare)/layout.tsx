import NotebookShell from "@/components/NotebookShell";

/**
 * Bare layout for the for-sale listing. Keeps the global notebook canvas
 * (cream dot-grid background) so styling matches the rest of the site, but
 * intentionally omits <Nav /> and <Header /> so visitors arriving from a
 * listing don't get a one-click path to the rest of the personal site.
 *
 * Anyone can still type the bare domain to reach the rest — this is
 * out-of-sight-out-of-mind, not access control.
 */
export default function BareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotebookShell>
      <main className="flex-1 flex flex-col gap-6 p-6">{children}</main>
    </NotebookShell>
  );
}
