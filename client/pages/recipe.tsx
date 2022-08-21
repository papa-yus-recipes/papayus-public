import React from "react";
import { createRoot } from "react-dom/client";

import type { Recipe } from "../requests/recipes.types";
import type { Review } from "../requests/reviews.types";

import "../common";

import AddReview from "../Components/AddReview";
import Content from "../Components/Content";
import Rating from "../Components/Rating";
import Section from "../Components/Section";
import { renderTags } from "../Components/Tag";
import { getCookies, isEven, minutesToTime, recipeImageUrl } from "../helpers";
import { json } from "../requests/helpers";
import { getRecipe } from "../requests/recipes.requests";

import "./recipe.css";

getRecipe(new URLSearchParams(window.location.search).get("id") as string)
  .then(json<[Recipe, Review[]]>)
  .then(([{ description, id, ingredients, name, servings, steps, tags, time }, reviews]) => {
    const { id: user_id } = getCookies("id");
    let user_can_review = true;
    let average = 0;
    const review_elements = reviews.map(({ comment, rating, user, updatedAt }, i) => {
      user_can_review = user_id !== user.id;
      average += rating;
      return (
        <div key={i}>
          <form className="d-flex align-items-center">
            <b>{user.username}</b>
            &ensp;@&ensp;
            <small>{new Date(updatedAt).toLocaleString()}</small>
            ;&ensp;
            <Rating
              className="mb-1"
              font-size={4}
              id={`${user.username}-rating`}
              default={rating}
              disabled
            />
          </form>
          <span className="position-relative comment">{comment}</span>
        </div>
      );
    });
    average = Math.round(average / review_elements.length);

    createRoot(document.getElementById(Content.id) as HTMLElement).render(
      <React.StrictMode>
        <Content h1-children={name}>
          <div className="d-flex gap-1 justify-content-center mb-4" id="recipe-tags">
            {renderTags(tags)}
          </div>
          <Section title="Description">
            <div className="bg-light rounded-pill">
              <img alt={name} className="d-flex mb-4 mx-auto shadow" src={recipeImageUrl(id)} />
            </div>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
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
            <ul className="list-group list-group-flush mx-auto shadow-sm text-center">
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
          <Section className="mx-auto" title="Reviews">
            <h3 className="mb-0 text-center">Reviews</h3>
            <form>
              <Rating
                className="d-flex justify-content-center mb-1"
                font-size={3}
                id="average-rating"
                default={average}
                disabled
              />
            </form>
            {user_can_review && <AddReview recipe-id={id} />}
            <div>{review_elements}</div>
          </Section>
        </Content>
      </React.StrictMode>
    );
  });
