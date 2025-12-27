import { motion } from "framer-motion";
import style from "./SkillProficiency.module.css";

const SkillProficiency = () => {
  const skillCategories = [
    {
      id: 1,
      category: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React", proficiency: 75 },
        { name: "JavaScript", proficiency: 80 },
        { name: "Tailwind CSS", proficiency: 78 },
        { name: "HTML/CSS", proficiency: 92 },
      ],
    },
    {
      id: 2,
      category: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", proficiency: 76 },
        { name: "Express.js", proficiency: 73 },
        { name: "MongoDB", proficiency: 80 },
        { name: "REST APIs", proficiency: 86 },
      ],
    },
    {
      id: 3,
      category: "Data Structures",
      icon: "📊",
      skills: [
        { name: "Arrays & Linked Lists", proficiency: 85 },
        { name: "Trees & Graphs", proficiency: 82 },
        { name: "Hash Tables", proficiency: 88 },
        { name: "Algorithms", proficiency: 80 },
      ],
    },
    {
      id: 4,
      category: "AI/ML",
      icon: "🤖",
      skills: [
        { name: "Python", proficiency: 85 },
        { name: "Pandas", proficiency: 79 },
        { name: "NumPy", proficiency: 80 },
        { name: "Machine Learning", proficiency: 82 },
      ],
    },
    {
      id: 5,
      category: "Tools & DevOps",
      icon: "🛠️",
      skills: [
        { name: "Git & GitHub", proficiency: 84 },
        { name: "Linux", proficiency: 80 },
        { name: "VS Code", proficiency: 95 },
      ],
    },
    {
      id: 6,
      category: "Databases",
      icon: "💾",
      skills: [
        { name: "SQL", proficiency: 87 },
        { name: "Sqlite", proficiency: 82 },
        { name: "NOSql", proficiency: 80 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -8,
      boxShadow: "0 15px 40px rgba(102, 126, 234, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className={style.skillProficiency}>
      <h2 className={style.title}>Skills & Proficiency</h2>
      <p className={style.subtitle}>
        Technical expertise across modern web development technologies
      </p>

      <motion.div
        className={style.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.id}
            className={style.card}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className={style.header}>
              <span className={style.icon}>{category.icon}</span>
              <h3 className={style["category-title"]}>{category.category}</h3>
            </div>

            <div className={style.skillsList}>
              {category.skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  className={style.skillItem}
                  custom={idx}
                  variants={skillVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className={style.skillHeader}>
                    <span className={style.skillName}>{skill.name}</span>
                    <span className={style.proficiency}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className={style.progressBar}>
                    <motion.div
                      className={style.progress}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillProficiency;
