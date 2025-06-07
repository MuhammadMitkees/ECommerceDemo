import React from "react";
import styles from "./Team.module.css";

const Team = () => {
  const leadership = [
    {
      name: "John Anderson",
      role: "Chief Executive Officer",
      bio: "With over 15 years of experience in e-commerce and digital transformation, John leads our company vision and strategy.",
      image:
        "https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_158538-4909.jpg",
    },
    {
      name: "William Zhang",
      role: "Chief Technology Officer",
      bio: "A tech innovator with a passion for AI and machine learning, William drives our technological advancement.",
      image:
        "https://t4.ftcdn.net/jpg/03/25/73/59/360_F_325735908_TkxHU7okor9CTWHBhkGfdRumONWfIDEb.jpg",
    },
    {
      name: "Robert Martinez",
      role: "Chief Operating Officer",
      bio: "Robert ensures smooth operations and delivery excellence across all our services and markets.",
      image:
        "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg",
    },
  ];

  const departments = [
    {
      name: "Technology",
      members: [
        {
          name: "Richard Lee",
          role: "Head of Engineering",
          image:
            "https://www.shutterstock.com/image-photo/smiling-busy-professional-african-american-600nw-2418465345.jpg",
        },
        {
          name: "Thomas Wright",
          role: "Lead UX Designer",
          image:
            "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg",
        },
      ],
    },
    {
      name: "Operations",
      members: [
        {
          name: "James Wilson",
          role: "Logistics Director",
          image:
            "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor_273609-16085.jpg",
        },
        {
          name: "Mark Thompson",
          role: "Customer Service Head",
          image:
            "https://img.freepik.com/free-photo/portrait-successful-man-having-stubble-posing-with-broad-smile-keeping-arms-folded_171337-1267.jpg",
        },
      ],
    },
    {
      name: "Marketing",
      members: [
        {
          name: "Alex Thompson",
          role: "Marketing Director",
          image:
            "https://img.freepik.com/free-photo/confident-handsome-caucasian-businessman-suit-smiling-standing-against-white-background_176420-45223.jpg",
        },
        {
          name: "Samuel Parker",
          role: "Brand Manager",
          image:
            "https://img.freepik.com/free-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg",
        },
      ],
    },
  ];

  return (
    <div className={styles.teamContainer}>
      <div className={styles.hero}>
        <h1>Our Team</h1>
        <p>Meet the People Behind Our Success</p>
      </div>

      <div className={styles.content}>
        <section className={styles.leadership}>
          <h2>Leadership Team</h2>
          <div className={styles.leadershipGrid}>
            {leadership.map((leader) => (
              <div key={leader.name} className={styles.leaderCard}>
                <div className={styles.leaderImage}>
                  <img src={leader.image} alt={leader.name} />
                </div>
                <div className={styles.leaderInfo}>
                  <h3>{leader.name}</h3>
                  <h4>{leader.role}</h4>
                  <p>{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.departments}>
          <h2>Our Departments</h2>
          {departments.map((dept) => (
            <div key={dept.name} className={styles.department}>
              <h3>{dept.name}</h3>
              <div className={styles.membersGrid}>
                {dept.members.map((member) => (
                  <div key={member.name} className={styles.memberCard}>
                    <div className={styles.memberImage}>
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className={styles.memberInfo}>
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className={styles.joinTeam}>
          <h2>Join Our Team</h2>
          <p>
            We're always looking for talented individuals who share our passion
            for innovation and customer service. Check out our careers page for
            current opportunities.
          </p>
          <button className={styles.joinButton}>View Open Positions</button>
        </section>
      </div>
    </div>
  );
};

export default Team;
