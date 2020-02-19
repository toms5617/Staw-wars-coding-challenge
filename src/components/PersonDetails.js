import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "react-loaders";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const PersonDetails = () => {
  const { name } = useParams();

  const [person, setPerson] = useState();
  const [planet, setPlanet] = useState();
  const [species, setSpecies] = useState();
  const [loading, setLoading] = useState(true);

  async function getDetails() {
    const { data } = await axios.get("https://swapi.co/api/people");

    //person
    const person = data.results.find(person =>
      person.name.toLowerCase().includes(name.toLowerCase().replace("-", " "))
    );
    setPerson(person);

    //planet
    const { data: planetData } = await axios.get(person.homeworld);
    setPlanet(planetData);

    //species
    const { data: speciesData } = await axios.get(person.species[0]);
    setSpecies(speciesData);

    //set the query results
    setLoading(false);
  }

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      getDetails();
    }

    return () => {
      isCancelled = true;
    };
  });

  // console.log(person)

  return (
    <>
      {!loading && (
        <Link to="/" className="back-button">
          {" "}
          <img alt="Back button icon" src="../images/back.png" />{" "}
          {`Back to results`}
        </Link>
      )}
      {loading && <Loader className="details-loader" type="ball-scale" />}
      {!loading && (
        <div className="person-wrapper">
          <div className="person-details">
            <h1>{person.name}</h1>
            <div className="person-description">
              <span aria-label="emoji" role="img">
                ⚥
              </span>{" "}
              {person.gender}{" "}
              <span aria-label="emoji" role="img">
                📏
              </span>{" "}
              {person.height}{" "}
              <span aria-label="emoji" role="img">
                👶
              </span>{" "}
              {person.birth_year}
            </div>
            <Tabs>
              <TabList>
                <Tab>Planet</Tab>
                <Tab>Species</Tab>
              </TabList>

              <TabPanel className="tab-content">
                <h2>{planet.name}</h2>
                <div className="feature">
                  <span className="feature-name">diameter</span>
                  <span className="feature-value">{planet.diameter} km</span>
                </div>
                <div className="feature">
                  <span className="feature-name">climate</span>
                  <span className="feature-value">{planet.climate}</span>
                </div>
                <div className="feature">
                  <span className="feature-name">gravity</span>
                  <span className="feature-value">{planet.gravity}</span>
                </div>
                <div className="feature">
                  <span className="feature-name">terrain</span>
                  <span className="feature-value">{planet.terrain}</span>
                </div>
              </TabPanel>
              <TabPanel className="tab-content">
                <h2>{species.name}</h2>
                <div className="feature">
                  <span className="feature-name">avarage height</span>
                  <span className="feature-value">
                    {species.average_height} cm
                  </span>
                </div>
                <div className="feature">
                  <span className="feature-name">skin color</span>
                  <span className="feature-value">{species.skin_colors}</span>
                </div>
                <div className="feature">
                  <span className="feature-name">hair colors</span>
                  <span className="feature-value">{species.hair_colors}</span>
                </div>
                <div className="feature">
                  <span className="feature-name">eye colors</span>
                  <span className="feature-value">{species.eye_colors}</span>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonDetails;
