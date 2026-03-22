export default function ArrowDown() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[2px] h-10 bg-cyan-400 shadow-[0_0_10px_cyan]"></div>
      <div className="w-0 h-0 
        border-l-[5px] border-l-transparent
        border-r-[5px] border-r-transparent
        border-t-[8px] border-t-cyan-400">
      </div>
    </div>
  );
}