export function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute h-full w-full bg-black opacity-10" />
      <div className="flex flex-col items-center justify-center">
        <span className="p-4 text-sm">loading</span>
      </div>
    </div>
  );
}
