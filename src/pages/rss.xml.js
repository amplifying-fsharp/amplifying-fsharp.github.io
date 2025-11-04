import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blogs = await getCollection("blog");
  const sessions = await getCollection("sessions");

  const blogItems = blogs.map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    description: `A blog post by ${post.data.author}`,
    author: post.data.author,
    link: `/blog/${post.id}`,
    categories: ["Blog"],
  }));

  const sessionItems = sessions.map((session) => ({
    title: session.data.title,
    pubDate: session.data.date,
    description: `${session.data.preview} - Champion: ${session.data.champion}`,
    author: session.data.champion,
    link: `/sessions/${session.id}`,
    categories: ["Session"],
  }));

  const allItems = [...blogItems, ...sessionItems].sort(
    (a, b) => b.pubDate - a.pubDate,
  );

  return rss({
    title: "Amplifying F#",
    description: "Blog posts and sessions from the Amplifying F# community",
    site: context.site,
    items: allItems,
    customData: `<language>en-us</language>`,
  });
}
