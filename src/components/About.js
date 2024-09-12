import React from 'react';
import './AboutUs.css';

const teamMembers = [
  {
    name: 'Lavanya',
    title: 'Founder & CEO',
    image: '/img/Team/la.jpg',
    bio: 'Lavanya is the visionary behind AgroTradeDynamicsForum with over 20 years of experience in the agricultural industry.'
  },
  {
    name: 'Sagar',
    title: 'AI Specialist',
    image: '/img/Team/sa.jpg',
    bio: 'Sagar is responsible for integrating AI into our farming solutions, enhancing productivity and efficiency.'
  },
  {
    name: 'Nithin',
    title: 'Workshop Coordinator',
    image: '/img/Team/n2.jpg',
    bio: 'Nithin organizes workshops and training sessions to educate our community on the latest agricultural techniques.'
  },
];

const About = () => {
  return (
    <div className="about-us">
      <section className="intro">
        <h1>About AgroTradeDynamicsForum</h1>
        <p>
          Welcome to AgroTradeDynamicsForum! We are a dedicated platform aimed at advancing the agricultural industry through collaboration, innovation, and sustainable practices. Our mission is to connect farmers, agronomists, researchers, and industry professionals to share knowledge and drive the future of agriculture. Explore our AI-driven tools, organic food marketplace, village goods, community forums, auction system, and learning workshops to stay ahead in the field.
        </p>
      </section>
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p className="title">{member.title}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;

// import React from 'react';
// import './AboutUs.css';

// const teamMembers = [
//   {
//     name: 'John Doe',
//     title: 'Founder & CEO',
//     image: '/img/Team/la.jpg',
//     bio: 'John is the visionary behind AgroTradeDynamicsForum with over 20 years of experience in the agricultural industry.'
//   },
//   {
//     name: 'Emily Brown',
//     title: 'Chief Agronomist',
//     image: '/img/Team/malavika.png',
//     bio: 'Emily leads our agronomy team with a focus on sustainable farming practices and innovative agricultural techniques.'
//   },
//   {
//     name: 'Michael Green',
//     title: 'AI Specialist',
//     image: '/img/Team/sa.jpg',
//     bio: 'Michael is responsible for integrating AI into our farming solutions, enhancing productivity and efficiency.'
//   },
//   {
//     name: 'Sarah Johnson',
//     title: 'Organic Food Expert',
//     image: '/img/Team/naveen.jpg',
//     bio: 'Sarah oversees our organic food segment, ensuring the highest quality standards and sustainability practices.'
//   },
//   {
//     name: 'David Lee',
//     title: 'Community Manager',
//     image: '/img/Team/siddu.jpg',
//     bio: 'David fosters engagement in our community forums, helping farmers and experts connect and share knowledge.'
//   },
//   {
//     name: 'Laura Adams',
//     title: 'Workshop Coordinator',
//     image: '/img/Team/n2.jpg',
//     bio: 'Laura organizes workshops and training sessions to educate our community on the latest agricultural techniques.'
//   },
// ];

// const About = () => {
//   return (
//     <div className="about-us">
//       <section className="intro">
//         <h1>About AgroTradeDynamicsForum</h1>
//         <p>
//           Welcome to AgroTradeDynamicsForum! We are a dedicated platform aimed at advancing the agricultural industry through collaboration, innovation, and sustainable practices. Our mission is to connect farmers, agronomists, researchers, and industry professionals to share knowledge and drive the future of agriculture. Explore our AI-driven tools, organic food marketplace, village goods, community forums, auction system, and learning workshops to stay ahead in the field.
//         </p>
//       </section>
//       <section className="team">
//         <h2>Meet Our Team</h2>
//         <div className="team-members">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="team-member">
//               <img src={member.image} alt={member.name} />
//               <h3>{member.name}</h3>
//               <p className="title">{member.title}</p>
//               <p className="bio">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;
// import React from 'react';
// import './AboutUs.css';

// const teamMembers = [
//   {
//     name: 'Lavanya',
//     title: 'Founder & CEO',
//     image: '/img/Team/la.jpg',
//     bio: 'Lavanya is the visionary behind AgroTradeDynamicsForum with over 20 years of experience in the agricultural industry.'
//   },
//   {
//     name: 'Malavika',
//     title: 'Chief Agronomist',
//     image: '/img/Team/malavika.png',
//     bio: 'Malavika leads our agronomy team with a focus on sustainable farming practices and innovative agricultural techniques.'
//   },
//   {
//     name: 'Sagar',
//     title: 'AI Specialist',
//     image: '/img/Team/sa.jpg',
//     bio: 'Michael is responsible for integrating AI into our farming solutions, enhancing productivity and efficiency.'
//   },
//   {
//     name: 'Naveen',
//     title: 'Organic Food Expert',
//     image: '/img/Team/naveen.jpg',
//     bio: 'Sarah oversees our organic food segment, ensuring the highest quality standards and sustainability practices.'
//   },
//   {
//     name: 'Siddu',
//     title: 'Community Manager',
//     image: '/img/Team/siddu.jpg',
//     bio: 'David fosters engagement in our community forums, helping farmers and experts connect and share knowledge.'
//   },
//   {
//     name: 'Nithin',
//     title: 'Workshop Coordinator',
//     image: '/img/Team/n2.jpg',
//     bio: 'Laura organizes workshops and training sessions to educate our community on the latest agricultural techniques.'
//   },
// ];

// const About = () => {
//   return (
//     <div className="about-us">
//       <section className="intro">
//         <h1>About AgroTradeDynamicsForum</h1>
//         <p>
//           Welcome to AgroTradeDynamicsForum! We are a dedicated platform aimed at advancing the agricultural industry through collaboration, innovation, and sustainable practices. Our mission is to connect farmers, agronomists, researchers, and industry professionals to share knowledge and drive the future of agriculture. Explore our AI-driven tools, organic food marketplace, village goods, community forums, auction system, and learning workshops to stay ahead in the field.
//         </p>
//       </section>
//       <section className="team">
//         <h2>Meet Our Team</h2>
//         <div className="team-members">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="team-member">
//               <img src={member.image} alt={member.name} />
//               <h3>{member.name}</h3>
//               <p className="title">{member.title}</p>
//               <p className="bio">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;

// // import React from 'react';
// // import './AboutUs.css';

// // const teamMembers = [
// //   {
// //     name: 'John Doe',
// //     title: 'Founder & CEO',
// //     image: '/img/Team/la.jpg',
// //     bio: 'John is the visionary behind AgroTradeDynamicsForum with over 20 years of experience in the agricultural industry.'
// //   },
// //   {
// //     name: 'Emily Brown',
// //     title: 'Chief Agronomist',
// //     image: '/img/Team/malavika.png',
// //     bio: 'Emily leads our agronomy team with a focus on sustainable farming practices and innovative agricultural techniques.'
// //   },
// //   {
// //     name: 'Michael Green',
// //     title: 'AI Specialist',
// //     image: '/img/Team/sa.jpg',
// //     bio: 'Michael is responsible for integrating AI into our farming solutions, enhancing productivity and efficiency.'
// //   },
// //   {
// //     name: 'Sarah Johnson',
// //     title: 'Organic Food Expert',
// //     image: '/img/Team/naveen.jpg',
// //     bio: 'Sarah oversees our organic food segment, ensuring the highest quality standards and sustainability practices.'
// //   },
// //   {
// //     name: 'David Lee',
// //     title: 'Community Manager',
// //     image: '/img/Team/siddu.jpg',
// //     bio: 'David fosters engagement in our community forums, helping farmers and experts connect and share knowledge.'
// //   },
// //   {
// //     name: 'Laura Adams',
// //     title: 'Workshop Coordinator',
// //     image: '/img/Team/n2.jpg',
// //     bio: 'Laura organizes workshops and training sessions to educate our community on the latest agricultural techniques.'
// //   },
// // ];

// // const About = () => {
// //   return (
// //     <div className="about-us">
// //       <section className="intro">
// //         <h1>About AgroTradeDynamicsForum</h1>
// //         <p>
// //           Welcome to AgroTradeDynamicsForum! We are a dedicated platform aimed at advancing the agricultural industry through collaboration, innovation, and sustainable practices. Our mission is to connect farmers, agronomists, researchers, and industry professionals to share knowledge and drive the future of agriculture. Explore our AI-driven tools, organic food marketplace, village goods, community forums, auction system, and learning workshops to stay ahead in the field.
// //         </p>
// //       </section>
// //       <section className="team">
// //         <h2>Meet Our Team</h2>
// //         <div className="team-members">
// //           {teamMembers.map((member, index) => (
// //             <div key={index} className="team-member">
// //               <img src={member.image} alt={member.name} />
// //               <h3>{member.name}</h3>
// //               <p className="title">{member.title}</p>
// //               <p className="bio">{member.bio}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default About;
