import React from "react";
import { createRoot } from "react-dom/client";

import "../common";

import Content from "../Components/Content";
import Section from "../Components/Section";
import { renderTags } from "../Components/Tag";
import { isEven, minutesToTime } from "../helpers";
import { getRecipe } from "../requests/recipes.requests";

import "./recipe.css";

getRecipe().then(({ description, id, ingredients, name, servings, steps, tags, time }) =>
  createRoot(document.getElementById(Content.id) as HTMLElement).render(
    <React.StrictMode>
      <Content h1-children={name}>
        <div className="d-flex gap-1 justify-content-center mb-4" id="recipe-tags">
          {renderTags(tags)}
        </div>
        <Section title="Description">
          <div className="bg-light rounded-pill">
            <img
              alt={name}
              className="d-flex mb-4 mx-auto"
              src={`https://papayus-recipe-images.s3.ap-southeast-1.amazonaws.com/${id}.jpg`}
            />
          </div>
          <p>{description}</p>
        </Section>
        <Section title="Recipe">
          <h2 className="mb-3 text-center">Recipe</h2>
          <table className="d-flex justify-content-center mx-auto table table-dark table-hover table-striped-columns">
            <tbody>
              <tr>
                <th className="ps-3 text-end">Time</th>
                <td className="pe-3">{minutesToTime(time)}</td>
              </tr>
              <tr>
                <th className="ps-3 text-end">Servings</th>
                <td className="pe-3">{servings}</td>
              </tr>
            </tbody>
          </table>
        </Section>
        <Section title="Ingredients">
          <h3 className="mb-3 text-center">Ingredients</h3>
          <ul className="list-group list-group-flush mx-auto text-center">
            {ingredients.map((v, i) => (
              <li className={`list-group-item ${isEven(i) && "bg-light"}`} key={i}>
                {v.main}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Steps">
          <h3 className="mb-3 text-center">Steps</h3>
          <ol className="bg-light list-group list-group-numbered mx-auto">
            {steps.map((v, i) => (
              <li
                className={`align-items-start d-flex justify-content-between list-group-item ${
                  isEven(i) && "bg-light"
                }`}
                key={i}
              >
                <div className="ms-2 me-auto">
                  {v.elaboration ? (
                    <>
                      <div className="fw-semibold">{v.step}</div>
                      {v.elaboration}
                    </>
                  ) : (
                    <div>{v.step}</div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </Content>
    </React.StrictMode>
  )
);
