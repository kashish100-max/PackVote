export default function ArrowDown({ highlighted }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-[2px] h-10 transition duration-300 ${highlighted ? "bg-cyan-300 shadow-[0_0_14px_cyan]" : "bg-cyan-400/30"}`}></div>
      <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] transition duration-300 ${highlighted ? "border-t-cyan-300" : "border-t-cyan-400/30"}`}></div>
    </div>
  );
}