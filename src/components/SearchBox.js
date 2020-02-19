import React from "react";
import { motion } from "framer-motion";

const SearchBox = ({ onChange, loading, people, query }) => (
  <motion.div
    animate={{ y: [-32, 0], opacity: [0, 1] }}
    transition={{ duration: 0.3 }}
  >
    <input
      defaultValue={query}
      className="search-box"
      placeholder="Find Character..."
      onChange={onChange}
    />
    <div className="loading">{loading && "Loading..."}</div>
    {query !== "" && !loading && (
      <div className="found-item-count">
        showing {people.length} result{people.length !== 1 && "s"} 🚀
      </div>
    )}
  </motion.div>
);

export default SearchBox;
