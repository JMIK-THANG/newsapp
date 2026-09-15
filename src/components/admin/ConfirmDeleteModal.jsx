export default function ConfirmDeleteModal({ article, isDeleting, onCancel, onConfirm }) {
  if (!article) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#111318]/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="delete-title" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <p className="mb-2 text-[10px] font-bold tracking-[.1em] text-[#a13f3f] uppercase">Confirm deletion</p>
        <h2 id="delete-title" className="mt-0 font-serif text-3xl">Delete this article?</h2>
        <p className="text-sm leading-6 text-[#4f5359]">Are you sure you want to delete “{article.title}”? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-lg border border-[#cfd2d4] bg-white px-5 py-2.5 text-sm font-semibold" type="button" disabled={isDeleting} onClick={onCancel}>Cancel</button>
          <button className="rounded-lg border-0 bg-[#8a3030] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50" type="button" disabled={isDeleting} onClick={onConfirm}>{isDeleting ? "Deleting…" : "Delete"}</button>
        </div>
      </div>
    </div>
  );
}
