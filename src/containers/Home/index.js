import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import picture from "picturefill";

import "./index.css";
import hero_webp from "./images/main_hero.webp";
import hero_png from "./images/main_hero.png";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Row>
        <picture className="mainHero">
          <source srcset={hero_webp} type="image/webp" />
          <img
            srcset={hero_png}
            alt="Storm trooper action figure look off to the right, black and white"
          />
        </picture>
      </Row>
      <Row gutter={16} className="triSection">
        <Col md={8} sm={24}>
          <h2>Graph</h2>
          <p>
            Checkout the graph that shows all of the connections between films,
            people, species, vehicles and more! Or if you are interested in the
            code, check out the{" "}
            <a
              href="https://github.com/brooksbecton/SWAPI-Graph"
              target="_blank"
              rel="noopener noreferrer"
            >
              repo
            </a>
          </p>
        </Col>
        <Col md={8} sm={24}>
          <h2>About</h2>
          <p>
            The graph shows all of the connections and information from the{" "}
            <a
              href="https://swapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SWAPI
            </a>. They have a ton of fascinating information, and this app
            brings that information into a intuitive user interface.
          </p>
        </Col>
        <Col md={8} sm={24}>
          <h2>Feedback</h2>
          <p>
            This project is still very new and has a lot of room for
            improvement! If you have any ideas or any issues, let me know!
          </p>
        </Col>
      </Row>

      <Row>
        <h2>Getting started</h2>
        <Row gutter={20}>
          <Col span={12}>
            <h3>What is this?</h3>
            <p>
              This allows users to see the kinds of data and relantionships that
              the SWAPI has. Instead of making API calls you can filter the
              graph down to checkout different relationships based on films,
              people, or any other collection that the SWAPI offers
            </p>
          </Col>
          <Col span={12}>
            <h3>How do I use it? </h3>
            <p>
              Go to the <Link to="/graph">Graph</Link> and allow the assets to
              load. Once you are there you can check different boxes to produce
              different graphs that show all kinds of relationships.
            </p>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Home;
