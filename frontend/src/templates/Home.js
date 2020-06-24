import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { useTranslation } from "react-i18next"

const Home = props => {
  const { t, i18n } = useTranslation("home")
  return (
    <Layout alternateLink={props.alternateLinks}>
      <SEO title="Homepage" />
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {props.data.allSanityProject.edges.map(({ node: project }, i) => {
          return (
            <li key={i} style={{ marginBottom: "3rem" }}>
              <Link
                to={`/${i18n.language}/${t("common:projectSlug")}/${
                  project.slug.current
                }`}
                style={{ color: "#000", textDecoration: "none" }}
              >
                <h2>{project.title}</h2>
                <Image
                  fluid={project.mainImage.asset.fluid}
                  alt={project.title}
                  style={{ marginBottom: "1rem" }}
                />
                <p>{project.description.translate}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query Homepage($language: String) {
    allSanityProject {
      edges {
        node {
          title
          slug {
            current
          }
          description {
            translate(language: $language)
          }
          mainImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`

export default Home
