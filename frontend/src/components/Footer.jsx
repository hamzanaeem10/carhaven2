export default function Footer() {
  return (
    <footer className="border-t border-slate-800">
      <div className="container py-6 text-sm text-slate-400">
        © {new Date().getFullYear()} CarHaven. All rights reserved.
      </div>
    </footer>
  );
}
