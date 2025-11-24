import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "./slicemachine.config.json";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

// TODO: Update the routes array to match your project's route structure.
const routes: Route[] = [
  { type: "home", path: "/" },
  { type: "search_recipes", path: "/recipe" },
  { type: "recipe_details", path: "/recipe/:uid" },
  { type: "about_us", path: "/about" },

];

export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 0 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
