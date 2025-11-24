import { createClient } from "@/prismicio";
import { cache } from "react";

export const getHomeData = cache(async () => {
    const client = createClient();
    return await client.getSingle("home");
});