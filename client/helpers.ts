import type { QueryParams, SearchOptions } from "./types";

import { RecipeKey } from "./requests/recipes.types";

export const dismissModal = () =>
  (document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement).click();

export const getCookies = <T extends string[]>(...keys: T) => {
  const document_cookies = document.cookie.split(/;\s*/);
  const cookies: Partial<Record<T[number], string>> = {};
  for (const key of keys) {
    const prefix = `${key}=`;
    const cookie = document_cookies.find((cookie) => cookie.startsWith(prefix));
    if (!cookie) continue;
    cookies[key as T[number]] = cookie.substring(prefix.length);
  }
  return cookies;
};

export const isEven = (n: number) => (n & 1) === 0;

export const minutesToTime = (minutes: number) => {
  const remainder = minutes % 60;
  let time = `${remainder}mins`;
  const hours = (minutes - remainder) / 60;
  if (hours) time = `${hours}h ${time}`;
  return time;
};

const objToQuery = (obj: Record<string, any>) => new URLSearchParams(obj).toString();

export const recipeUrl = (key: RecipeKey) => `/recipe.html?${objToQuery(key)}`;

export const recipeImageUrl = (id: RecipeKey["id"]) =>
  `https://b3g5m4hr8i.execute-api.ap-southeast-1.amazonaws.com/default/recipe-images/${id}.jpg`;

export const rgbToString = (rgb: number[]) => `rgb(${rgb.join(",")})`;

export const searchUrl = ({ query, tags }: SearchOptions) => {
  const params: QueryParams = {};
  if (query) params["query"] = query;
  if (tags) params["tags"] = tags.join(",");

  return `/search.html?${objToQuery(params)}`;
};

// Adapted from http://jsfiddle.net/4d8Pv
export const wordToColor = (() => {
  // color table: [red, green, blue, weight]
  const colors: Record<string, number[]> = {
    // basic primary colors:
    red: [255, 0, 0, 0.7],
    yellow: [255, 255, 0, 0.7],
    green: [0, 255, 0, 1.1],
    cyan: [0, 255, 255, 1],
    blue: [0, 0, 255, 1.1],
    purple: [255, 0, 255, 1.1],
    // grays:
    black: [0, 0, 0, 0.2],
    white: [255, 255, 255, 0.2],
    gray: [127, 127, 127, 0.2],
    grey: [127, 127, 127, 0.2], // British spelling
    // other colors, with reduced weights (could add a lot more):
    brown: [191, 127, 0, 0.7],
    orange: [255, 127, 0, 0.7],
    indigo: [127, 0, 255, 0.9],
    magenta: [255, 0, 255, 0.8],
    pink: [255, 127, 127, 0.7]
  };

  // Levenshtein distance algorithm by Marco de Wit, http://stackoverflow.com/a/18514751
  const levenshtein = (() => {
    const row2 = new Array<number>();
    return (word: string, color: string) => {
      const word_len = word.length;
      const color_len = color.length;
      if (word_len && color_len) {
        let i1 = 0;
        let i2 = 0;
        let a = 0;
        let b = 0;
        let c = 0;
        let c2 = 0;
        const row = row2;
        while (i1 < word_len) row[i1] = ++i1;
        while (i2 < color_len) {
          c2 = color.charCodeAt(i2);
          a = i2;
          ++i2;
          b = i2;
          for (let i1 = 0; i1 < word_len; ++i1) {
            c = a + (word.charCodeAt(i1) === c2 ? 0 : 1);
            a = row[i1] as number;
            b = b < a ? (b < c ? b + 1 : c) : a < c ? a + 1 : c;
            row[i1] = b;
          }
        }
        return b;
      } else {
        return word_len + color_len;
      }
    };
  })();

  return (word: string) => {
    let rgb = colors[word];

    if (!rgb) {
      rgb = [0, 0, 0];
      let div = 0;
      for (const color in colors) {
        const dist = levenshtein(word, color);
        const rgba = colors[color] as number[];
        const weight = (rgba[3] as number) / (dist * dist);
        for (let i = 0; i < 3; i++) {
          rgb[i] += (rgba[i] as number) * weight;
        }
        div += weight;
      }
      for (let i = 0; i < 3; i++) {
        rgb[i] = Math.round((rgb[i] as number) / div);
      }
    }
    return rgb;
  };
})();
