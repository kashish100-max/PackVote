import { motion } from "framer-motion";
import { LinkedinIcon, User } from "lucide-react";

export default function Team() {
  const members = [
    {
      name: "Kashish Sharma",
      roll: "2024UCS1671",
      link: "#",
    },
    {
      name: "Srishti Singh",
      roll: "2024UCS1685",
      link: "#",
    },
    {
      name: "Shriya Bhargava",
      roll: "2024UCS1681",
      link: "#",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-20" id="team">

      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <p className="text-cyan-400 text-sm tracking-widest mb-4 text-center">
  PROJECT TEAM
</p>

<h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
  <span className="text-white">Meet the </span>
  <span className="text-cyan-400">Team</span>
</h2>

<p className="text-gray-400 text-center mb-12">
  The minds behind PackVote
</p>
      </motion.div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="group relative p-8 rounded-2xl text-center 
            border border-white/10 
            bg-[#020617]/40 backdrop-blur-md
            transition duration-300 
            hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
          >

            {/* PROFILE ICON */}
            <div className="w-28 h-28 mx-auto mb-6 rounded-full 
            flex items-center justify-center 
            border border-cyan-400/30 
            bg-[#020617] 
            group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
            transition duration-300">

              <User size={40} className="text-cyan-400" />
            </div>

            {/* NAME */}
            <h3 className="text-xl font-semibold text-white mb-2">
              {member.name}
            </h3>

            {/* ROLL */}
            <p className="text-gray-400 mb-6">
              {member.roll}
            </p>

            {/* BUTTON */}
            <a
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full 
              border border-cyan-400/40 text-cyan-400 
              hover:bg-cyan-400 hover:text-black 
              transition duration-300"
            >
              <LinkedinIcon size={16} />
              Connect
            </a>

          </motion.div>
        ))}

      </div>
    </div>
  );
}