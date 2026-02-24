export default function NotebookShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="notebook-page">
      {/* dot-grid fills full width — cream background + dots extend edge to edge */}
      <div className="dot-grid">
        {/* content capped at 1440px and centred inside the dot-grid */}
        <div className="content-max-width flex flex-col md:flex-row">
          {children}
        </div>
      </div>
    </div>
  );
}
