import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = ({ data }) => {
  // const { t } = useTranslation("project")
  const { title, mainImage, description, categories } = data.sanityProject
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <ul>
        {categories.map((category, i) => {
          return <li key={i}>{category.title}</li>
        })}
      </ul>
      <Image fluid={mainImage.asset.fluid} style={{ marginBottom: "1rem" }} />
      <p>{description.translate}</p>
    </Layout>
  )
}

// export const query = graphql`
//   query($slug: String) {
//     sanityProject(slug: { current: { eq: $slug } }) {
//       title
//     }
//   }
// `

export const query = graphql`
  query Project($project: String, $language: String) {
    sanityProject(id: { eq: $project }) {
      title
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
      categories {
        title
      }
    }
  }
`

export default Project
