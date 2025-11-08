export default function Pagination({ page, total, limit, onChange }) {
  const pages = Math.ceil(total / limit);
  if (pages <= 1) return null;
  return (
    <div className="flex gap-2 mt-6 justify-center">
      {Array.from({ length: pages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1 rounded ${p === page ? 'bg-brand text-white' : 'bg-slate-800'}`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
