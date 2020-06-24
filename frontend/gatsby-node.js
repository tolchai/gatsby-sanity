/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs")
const path = require("path")
const i18next = require("i18next")
const nodeFsBackend = require("i18next-node-fs-backend")

const allLanguages = ["en", "de"]

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const srcPath = resolveApp("src")

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  const homeTemplate = path.resolve(`src/templates/Home.js`)
  await buildI18nPages(
    null,
    (_, language) => ({
      path: "/" + language, // (1)
      component: homeTemplate,
      context: {},
    }),
    ["common", "home"],
    createPage
  )

  const pageTemplate = path.resolve(`src/templates/Page.js`)
  const pages = await graphql(`
    query Page {
      allSanityPage {
        edges {
          node {
            id
            _rawSlug
          }
        }
      }
    }
  `)

  await buildI18nPages(
    pages.data.allSanityPage.edges,
    ({ node }, language, i18n) => ({
      path: `/${language}/${node._rawSlug[language].current}`,
      component: pageTemplate,
      context: { page: node.id },
    }),
    ["common"],
    createPage
  )

  const projectTemplate = path.resolve(`src/templates/project.js`)
  const projects = await graphql(`
    query Project {
      allSanityProject {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)
  await buildI18nPages(
    projects.data.allSanityProject.edges,
    ({ node }, language, i18n) => ({
      path: `/${language}/${i18n.t("common:projectSlug")}/${
        // node._rawSlug[language]
        node.slug.current
      }`,
      component: projectTemplate,
      context: { project: node.id },
    }),
    ["common"],
    createPage
  )

  await build404Pages(createPage)

  createRedirect({ fromPath: "/", toPath: "/en", isPermanent: true })

  allLanguages.forEach(language =>
    createRedirect({
      fromPath: `/${language}/*`,
      toPath: `/${language}/404`,
      statusCode: 404,
    })
  )

  createRedirect({ fromPath: "/*", toPath: "/404", statusCode: 404 })
}

const buildI18nPages = async (
  inputData,
  pageDefinitionCallback,
  namespaces,
  createPage
) => {
  if (!Array.isArray(inputData)) inputData = [inputData]
  await Promise.all(
    inputData.map(async ipt => {
      const definitions = await Promise.all(
        allLanguages.map(async language => {
          const i18n = await createI18nextInstance(language, namespaces) // (1)
          const res = pageDefinitionCallback(ipt, language, i18n) // (2)
          res.context.language = language
          res.context.i18nResources = i18n.services.resourceStore.data // (3)
          return res
        })
      )

      const alternateLinks = definitions.map(d => ({
        // (4)
        language: d.context.language,
        path: d.path,
      }))

      definitions.forEach(d => {
        d.context.alternateLinks = alternateLinks
        createPage(d) // (5)
      })
    })
  )
}

const createI18nextInstance = async (language, namespaces) => {
  const i18n = i18next.createInstance()
  i18n.use(nodeFsBackend)
  await new Promise(resolve =>
    i18n.init(
      {
        lng: language,
        ns: namespaces,
        fallbackLng: language,
        interpolation: { escapeValue: false },
        backend: { loadPath: `${srcPath}/locales/{{lng}}/{{ns}}.json` },
      },
      resolve
    )
  )
  return i18n
}

const build404Pages = async createPage => {
  const errorTemplate = path.resolve(`src/templates/404.js`)
  await Promise.all(
    allLanguages.map(async (language, index) => {
      const i18n = await createI18nextInstance(language, ["common", 404])
      const res = {
        path: "/" + language + "/404",
        component: errorTemplate,
        context: {},
      }
      res.context.language = language
      res.context.i18nResources = i18n.services.resourceStore.data
      createPage(res)
      if (index === 0) {
        res.path = "/404"
        createPage(res)
      }
    })
  )
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SanityLocaleString: {
      translate: {
        type: `String!`,
        args: { language: { type: "String" } },
        resolve: (source, args) => {
          return source[args.language] || source["en"]
        },
      },
    },
    // SanityLocaleBlock: {
    //   translate: {
    //     type: `Boolean!`,
    //     args: { language: { type: "String" } },
    //     resolve: (source, args) => {
    //       console.log(args)
    //       console.log("---------------")
    //       console.log(source)
    //       return source[args.language] || source["en"]
    //     },
    //   },
    // },
  })
}

// old

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const result = await graphql(`
//     {
//       allSanityProject(filter: { slug: { current: { ne: null } } }) {
//         edges {
//           node {
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (result.errors) {
//     throw result.errors
//   }

//   const projects = result.data.allSanityProject.edges || []
//   projects.forEach((edge, index) => {
//     const path = `/project/${edge.node.slug.current}`

//     createPage({
//       path,
//       component: require.resolve("./src/templates/project.js"),
//       context: { slug: edge.node.slug.current },
//     })
//   })
// }
