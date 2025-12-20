export default function Background() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base color */}
      <div className="absolute inset-0 bg-[#f4f2ed] dark:bg-[#041716]" />

      {/* Grid overlay */}
      <div className="absolute inset-y-0 grid-bg" />
    </div>
  );
}
