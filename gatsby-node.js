/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const slugify = require('slugify');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return Promise.all([
    new Promise(async resolve => {
      await graphql(`
        {
          allMdx(sort: { fields: frontmatter___date, order: DESC }) {
            nodes {
              frontmatter {
                title
                date
              }
              code {
                body
              }
            }
          }
        }
      `)
        .then(result => {
          const articles = result.data.allMdx.nodes;
          articles.forEach(async article => {
            const slug = slugify(article.frontmatter.title.toLowerCase());
            console.log({ slug });
            await createPage({
              path: slug,
              context: {
                article,
              },
              component: path.resolve(`./src/components/article_layout.jsx`),
            });
          });
        })
        .catch(e => console.log(e));
      resolve();
    }),
  ]);
};
