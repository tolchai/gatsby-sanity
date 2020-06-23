module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `6bqprral`,
        dataset: `production`,
        overlayDrafts: true,
        watchMode: true,
        // a token with read permissions is required
        // if you have a private dataset
        // token: process.env.SANITY_TOKEN,
        token:
          "sk6iTDlYLLotfsC3AnIKI9F3L7dljV3V1x5iaJueqncmwSwGMp7XS6JsseBmvPlJWY75huK0y8g0THe3MJDb93TEy7et3zfZB55apMo8YtgJA063FTorrPnCPWbnZPy5JLGB0rteO7AsPnxWZMs553rexq1TErPoKVivCHm00bWvILz3nsgF",

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
