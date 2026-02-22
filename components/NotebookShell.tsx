export default function NotebookShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="notebook-page">
      <div className="dot-grid flex flex-col md:flex-row">
        {children}
      </div>
    </div>
  );
}
