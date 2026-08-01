export function StationTitle({ name }: { name: string }) {
  return (
    <div className="flex h-1/4 w-full items-center justify-center portrait:h-[30%] portrait:pt-[10%]">
      <h1 className="text-[7vw] font-bold text-white select-none portrait:text-[12vw]">{name}</h1>
    </div>
  );
}
