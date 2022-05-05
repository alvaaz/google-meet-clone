import type { LoaderFunction } from "@remix-run/node";
import { getUser } from "~/utils/auth.server";
import { redirect } from "@remix-run/node";
import { generateCallID } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const user = await getUser(request);
    if (user) {
      const roomId = generateCallID();
      return redirect(`/room/${roomId}`);
    }
  } catch (error) {
    console.error(error);
  }

  return (await getUser(request)) ? redirect("/") : null;
};
