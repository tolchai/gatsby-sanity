import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`
  {
    allSanityProject {
      edges {
        node {
          title
          description
          slug {
            current
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

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>My Portfolio</h1>
      <ul>
        {data.allSanityProject.edges.map(({ node: project }, i) => {
          return (
            <li className={i}>
              <Link to={`/project/${project.slug.current}`}>
                <h2>{project.title}</h2>
                <Image
                  fluid={project.mainImage.asset.fluid}
                  alt={project.title}
                />
                <p>{project.description}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default IndexPage
