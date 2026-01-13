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
      description:
        "Hands-on experience in system design, feature proposals, and data analysis within a FinTech simulation.",
      link: "https://drive.google.com/file/d/12l2LCV2FHblWWPbQ1C5AVCqa2PDzKzbd/view?usp=sharing",
    },
    {
      id: 2,
      title: "Web Development",
      issuer: "Infosys Springboard",
      date: "2023",
      icon: "🎓",
      description:
        "Comprehensive front-end development training covering HTML, CSS, JavaScript, React, and modern UI practices.",
      link: "https://drive.google.com/file/d/1IL1TpJXc_iJ0vO4Ry2CjsDd_hGBqaeEB/view?usp=sharing",
    },
    {
      id: 3,
      title: "Foundations of AI",
      issuer: "Microsoft Initiative (Edunet Foundation, AICTE)",
      date: "2024",
      icon: "🤖",
      description:
        "Fundamentals of artificial intelligence including machine learning concepts and real-world applications.",
      link: "https://drive.google.com/file/d/1Xb87NlCAd-TG22iH0kpoNze0QluSbBFx/view?usp=sharing",
    },
    {
      id: 4,
      title: "AI–ML Virtual Internship",
      issuer: "AICTE",
      date: "2024",
      icon: "🧠",
      description:
        "Practical exposure to machine learning workflows, model building, and real-world problem-solving.",
      link: "https://drive.google.com/file/d/1GHVorkLn9GkZ6MsSEs7-Eva3tXFxduHm/view?usp=sharing",
    },
    {
      id: 5,
      title: "Fundamentals of C++",
      issuer: "IBM (edX Verified Certificate)",
      date: "2023",
      icon: "💻",
      description:
        "Strong foundation in C++ programming, object-oriented concepts, and problem-solving techniques.",
      link: "https://drive.google.com/file/d/1Wnag6pH-fdGB-f-Mdwpy8-G_zrTT3ylU/view?usp=sharing",
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
            Professional courses and certifications I’ve completed
          </p>
        </div>

        <motion.a
          href="https://drive.google.com/drive/folders/1VPRjuKWptTG6lAuUMpLdN6sKKIhBia15?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={style.driveButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📁 View Certificates
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
            onClick={() => window.open(cert.link, "_blank")}
            style={{ cursor: "pointer" }}
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
              <motion.span className={style.badge} whileHover={{ scale: 1.05 }}>
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
