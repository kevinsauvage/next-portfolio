import projects from "../data/projects";

const Sitemap = () => null;

export const getServerSideProps = async ({ res, locales }) => {
  const BASE_URL = "https://www.kevin-sauvage.com/";

  const paths = [BASE_URL];

  const projectPath = projects.map((item) => BASE_URL + `project/${item.title}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${paths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
        ${projectPath
          .map((url) => {
            return `
            <url>
              <loc>${url}</loc>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
