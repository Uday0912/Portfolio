import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaClock, FaTag, FaArrowRight } from 'react-icons/fa';
import styles from './BlogArticles.module.css';

const blogArticles = [
  {
    id: 1,
    title: 'Building Scalable Web Applications with React & Node.js',
    excerpt: 'Learn best practices for building scalable applications with React on the frontend and Node.js on the backend.',
    date: 'Dec 20, 2024',
    readTime: '8 min read',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'Performance'],
    image: 'https://via.placeholder.com/400x200?text=React+Node',
    content: 'In this comprehensive guide, we explore the architecture and patterns needed to build scalable web applications...',
  },
  {
    id: 2,
    title: 'Mastering Data Structures and Algorithms for Interviews',
    excerpt: 'Essential data structures and algorithms every developer should know for technical interviews.',
    date: 'Dec 18, 2024',
    readTime: '12 min read',
    category: 'DSA',
    tags: ['Algorithms', 'Data Structures', 'Interview'],
    image: 'https://via.placeholder.com/400x200?text=DSA+Guide',
    content: 'Data Structures and Algorithms are fundamental to computer science. This article covers the most important concepts...',
  },
  {
    id: 3,
    title: 'Getting Started with Machine Learning using Python',
    excerpt: 'An introduction to machine learning concepts and practical implementation using Python libraries.',
    date: 'Dec 15, 2024',
    readTime: '10 min read',
    category: 'Machine Learning',
    tags: ['Python', 'ML', 'TensorFlow', 'Scikit-learn'],
    image: 'https://via.placeholder.com/400x200?text=ML+Python',
    content: 'Machine Learning has become essential in modern software development. Learn how to start your ML journey with Python...',
  },
  {
    id: 4,
    title: 'CSS Grid and Flexbox: Creating Modern Responsive Layouts',
    excerpt: 'Master CSS Grid and Flexbox to create beautiful, responsive layouts without using frameworks.',
    date: 'Dec 12, 2024',
    readTime: '7 min read',
    category: 'Frontend',
    tags: ['CSS', 'Responsive Design', 'Layout'],
    image: 'https://via.placeholder.com/400x200?text=CSS+Layouts',
    content: 'CSS Grid and Flexbox are powerful tools for creating modern layouts. Learn when to use each and how to combine them...',
  },
  {
    id: 5,
    title: 'Understanding Async/Await in JavaScript',
    excerpt: 'Deep dive into asynchronous programming patterns and how async/await simplifies callback hell.',
    date: 'Dec 10, 2024',
    readTime: '9 min read',
    category: 'JavaScript',
    tags: ['JavaScript', 'Async', 'Promises'],
    image: 'https://via.placeholder.com/400x200?text=Async+JavaScript',
    content: 'Asynchronous programming can be tricky. This guide explains promises, async/await, and how to handle errors properly...',
  },
  {
    id: 6,
    title: 'MongoDB Best Practices for Production Applications',
    excerpt: 'Tips and best practices for optimizing MongoDB queries and ensuring database reliability.',
    date: 'Dec 08, 2024',
    readTime: '11 min read',
    category: 'Database',
    tags: ['MongoDB', 'NoSQL', 'Performance'],
    image: 'https://via.placeholder.com/400x200?text=MongoDB+Guide',
    content: 'MongoDB is a powerful database, but requires careful optimization. Learn indexing, aggregation, and performance tuning...',
  },
];

const categories = ['All', ...new Set(blogArticles.map(article => article.category))];

const ArticleCard = ({ article, index }) => {
  return (
    <motion.article
      className={styles.articleCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.imageWrapper}>
        <img src={article.image} alt={article.title} />
        <div className={styles.overlay}>
          <motion.button
            className={styles.readMoreBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
            <FaArrowRight />
          </motion.button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{article.category}</span>
          <span className={styles.readTime}>
            <FaClock size={12} />
            {article.readTime}
          </span>
        </div>

        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>

        <div className={styles.tags}>
          {article.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.date}>
            <FaCalendar size={12} />
            {article.date}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export const BlogArticles = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? blogArticles
    : blogArticles.filter(article => article.category === selectedCategory);

  return (
    <motion.section
      className={styles.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Blog & Articles
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Insights, tutorials, and learnings from my tech journey
        </motion.p>
      </div>

      <motion.div
        className={styles.filterContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {categories.map(category => (
          <motion.button
            key={category}
            className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          className={styles.articlesGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredArticles.length === 0 && (
        <motion.div
          className={styles.noArticles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No articles found in this category. Check back soon!</p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default BlogArticles;
