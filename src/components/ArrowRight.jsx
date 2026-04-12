export default function ArrowRight({ highlighted }) {
  return (
    <div className="flex items-center">
      <div className={`w-14 h-[2px] transition duration-300 ${highlighted ? "bg-white shadow-[0_0_14px_white]" : "bg-white/30"}`}></div>
      <div className={`w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] transition duration-300 ${highlighted ? "border-l-white" : "border-l-white/30"}`}></div>
    </div>
  );
}