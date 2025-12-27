import { motion } from "framer-motion";
import style from "./Certifications.module.css";

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "Technology Software Development Job Simulation",
      issuer: "Citi (Forage)",
      date: "May 2025",
      icon: "🏦",
      description:"Hands-on experience in system design, feature proposals, and data analysis within a FinTech simulation."
    },
    {
      id: 2,
      title: "Python",
      issuer: "Infoys SpringBoard",
      date: "2023",
      icon: "📜",
      description: "Advanced JavaScript concepts and ES6+ features",
    },
    {
        id: 1,
        title: "Full Stack Web Development",
        issuer: "Infosys Springboard",
        date: "2023",
        icon: "🎓",
        description: "Comprehensive full stack web development training with modern technologies.",
      },
    {
      id: 4,
      title: "Foundations of AI",
      issuer: "AICTE",
      date: "2024",
      icon: "🤖",
      description: "Machine learning algorithms, deep learning, and AI fundamentals",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className={style.certifications}>
      <div className={style.header}>
        <div className={style.titleSection}>
          <h2 className={style.title}>Certifications & Credentials</h2>
          <p className={style.subtitle}>
            Professional courses and certifications I've completed
          </p>
        </div>
        <motion.a
          href="https://drive.google.com/drive/folders/YOUR_DRIVE_FOLDER_ID"
          target="_blank"
          rel="noopener noreferrer"
          className={style.driveButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📁 View on Drive
        </motion.a>
      </div>

      <motion.div
        className={style.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            className={style.card}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className={style.header}>
              <span className={style.icon}>{cert.icon}</span>
              <div className={style.meta}>
                <h3 className={style["card-title"]}>{cert.title}</h3>
                <p className={style.issuer}>{cert.issuer}</p>
              </div>
            </div>

            <p className={style.description}>{cert.description}</p>

            <div className={style.footer}>
              <span className={style.date}>{cert.date}</span>
              <motion.span
                className={style.badge}
                whileHover={{ scale: 1.05 }}
              >
                Verified
              </motion.span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Certifications;
