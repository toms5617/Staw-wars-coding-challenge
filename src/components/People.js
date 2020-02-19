import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const childVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const People = ({ people }) => (
  <motion.div variants={variants} className="person-wrapper grid-3">
    {people.map(person => {
      return (
        <Link
          className="link"
          key={person.name}
          to={`/people/${person.name.toLowerCase().replace(" ", "-")}`}
        >
          <motion.div variants={childVariants} className="person">
            <h5>{person.name}</h5>
            <div>
              <span aria-label="emoji" role="img">
                ⚥
              </span>{" "}
              {person.gender}
            </div>
            <div>
              <span aria-label="emoji" role="img">
                📏
              </span>{" "}
              {person.height}
            </div>
          </motion.div>
        </Link>
      );
    })}
  </motion.div>
);

export default People;
