import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import VantaNet from "vanta/dist/vanta.net.min.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import People from "./components/People";
import SearchBox from "./components/SearchBox";
import Logo from "./components/Logo";
import PersonDetails from "./components/PersonDetails";

import "./App.scss";

function App() {
  // State
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState("");
  const appRef = useRef(null);

  const updateQuery = debounce(value => {
    setQuery(value);
  }, 300);

  // Gets list of people based on the query in the search
  async function getPeople(query) {
    setLoading(true);
    const { data } = await axios.get("https://swapi.co/api/people");

    //filter out people that do not contain the query value in their name
    const matchingPeople = data.results.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );

    //set the query results
    setLoading(false);
    setPeople(matchingPeople);
  }

  //fetch results when query specified
  useEffect(() => {
    if (query !== "") {
      getPeople(query);
    }
  }, [query]);

  //init vanta background when component is mounted
  useEffect(() => {
    VantaNet({
      el: appRef.current,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xffffff,
      backgroundColor: 0x100328,
      maxDistance: 10.0
    });
  }, [appRef]);

  return (
    <Router>
      {/* Home */}

      <div className="App" ref={appRef}>
        <div className="wrapper all-center">
          <Switch>
            <Route path="/" exact>
              <Logo />
              <SearchBox
                onChange={e => updateQuery(e.target.value)}
                query={query}
                loading={loading}
                people={people}
              />
              {query !== "" && !loading && <People people={people} />}
            </Route>
            {/* Details */}
            <Route path="/people/:name">
              <PersonDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
