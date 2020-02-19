import React from "react";
import { motion } from "framer-motion";

const Logo = () => (
  <motion.img
    animate={{ y: [-32, 0], opacity: [0, 1] }}
    ransition={{ duration: 0.3 }}
    className="logo"
    src="images/Star_Wars_logo.png"
    alt="starwars logo"
  />
);

export default Logo;
