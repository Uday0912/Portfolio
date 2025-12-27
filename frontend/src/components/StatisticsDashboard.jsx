import { motion } from 'framer-motion';
import { FaCode, FaGithub, FaLaptopCode, FaBook } from 'react-icons/fa';
import styles from './StatisticsDashboard.module.css';

const stats = [
  {
    icon: FaCode,
    label: 'Projects Completed',
    value: 8,
    color: '#10b981',
    description: 'Full-stack applications and tools'
  },
  {
    icon: FaGithub,
    label: 'GitHub Repositories',
    value: 12,
    color: '#06b6d4',
    description: 'Open source and personal projects'
  },
  {
    icon: FaLaptopCode,
    label: 'Skills Mastered',
    value: 15,
    label2: '+',
    color: '#f59e0b',
    description: 'Programming languages and frameworks'
  },
  {
    icon: FaBook,
    label: 'Courses Completed',
    value: 10,
    color: '#8b5cf6',
    description: 'From DSA to ML/AI specialization'
  }
];

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  
  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className={styles.iconWrapper} style={{ borderColor: stat.color }}>
        <Icon style={{ color: stat.color }} className={styles.icon} />
      </div>
      
      <div className={styles.content}>
        <motion.div
          className={styles.valueContainer}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: 'spring' }}
        >
          <span className={styles.value}>{stat.value}</span>
          {stat.label2 && <span className={styles.plus}>{stat.label2}</span>}
        </motion.div>
        
        <h3 className={styles.label}>{stat.label}</h3>
        <p className={styles.description}>{stat.description}</p>
      </div>

      <div className={styles.bgAccent} style={{ backgroundColor: `${stat.color}20` }}></div>
    </motion.div>
  );
};

export const StatisticsDashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      className={styles.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.headerSection}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Statistics Dashboard
        </motion.h2>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Quick overview of my journey and achievements
        </motion.p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      <motion.div
        className={styles.ctaSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className={styles.ctaText}>Want to see all my projects and contributions?</p>
        <motion.a
          href="#Projects"
          className={styles.ctaButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Projects
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default StatisticsDashboard;
