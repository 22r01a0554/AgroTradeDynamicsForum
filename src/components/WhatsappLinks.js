import React from 'react';
const WhatsAppLinks = () => {
  const groups = [
    { name: 'Group 1', link: 'https://chat.whatsapp.com/H18b9MJtiFw7ydt5XwTg1W' },
    { name: 'Group 2', link: 'https://chat.whatsapp.com/H18b9MJtiFw7ydt5XwTg1W' },
    { name: 'Group 3', link: 'https://chat.whatsapp.com/H18b9MJtiFw7ydt5XwTg1W' },
  ];

  return (
    <div>
      <h1>Join our WhatsApp Groups</h1>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            <a href={group.link} target="_blank" rel="noopener noreferrer">
              {group.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatsAppLinks
