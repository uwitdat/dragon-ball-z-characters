import type { LoaderFunction } from "@remix-run/node";
import { searchChars } from "~/API";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  const data = await searchChars(query);
  return json(data);
};
