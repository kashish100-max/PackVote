export default function ArrowLeft({ highlighted }) {
  return (
    <div className="flex items-center">
      <div className={`w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] transition duration-300 ${highlighted ? "border-r-cyan-300" : "border-r-cyan-400/30"}`}></div>
      <div className={`w-14 h-[2px] transition duration-300 ${highlighted ? "shadow-[0_0_14px_cyan]" : "bg-cyan-400/30"}`}></div>
    </div>
  );
}