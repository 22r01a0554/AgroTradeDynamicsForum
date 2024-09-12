import React from 'react';
import styles from './WhatsAppLinks.module.css';

const WhatsAppLinks = () => {
  const groups = [
    { name: 'Farmers Group', link: 'https://chat.whatsapp.com/H18b9MJtiFw7ydt5XwTg1W' },
    { name: 'Customers Group', link: 'https://chat.whatsapp.com/H18b9MJtiFw7ydt5XwTg1W' },
    { name: 'Farmer Customer Group', link: 'https://chat.whatsapp.com/H18b9MJtiFw7ydt5XwTg1W' },
    { name: 'Recipe Sharing Group', link: 'https://chat.whatsapp.com/LlkO4s0cHcgJkL7tzaxEWQ' },
    { name: 'Workshops Notifications', link: 'https://chat.whatsapp.com/Jij2oQD4krm9AitKEgx1BZ' },
    { name: 'Latest News SharingGroup', link: 'https://chat.whatsapp.com/HoF5iZacSAFF2zQxvyKY6J' },
    { name: 'Farmer Customer Group', link: 'https://chat.whatsapp.com/H18b9MJtiFw7ydt5XwTg1W' },
    { name: 'Farmer Customer Group', link: 'https://chat.whatsapp.com/H18b9MJtiFw7ydt5XwTg1W' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Join our Community Forums</h1>
        <ul className={styles.list}>
        {groups.map((group, index) => (
          <li key={index} className={styles.listItem}>
            <a href={group.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {group.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatsAppLinks;
