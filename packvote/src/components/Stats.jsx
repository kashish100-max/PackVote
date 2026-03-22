import { useEffect, useState } from "react";

function Counter({ end, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold text-white">
        {count}+
      </h2>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="py-16 flex justify-around">
      <Counter end={50} label="GROUPS PLANNED" />
      <Counter end={120} label="DESTINATIONS" />
      <Counter end={98} label="SATISFACTION" />
    </div>
  );
}