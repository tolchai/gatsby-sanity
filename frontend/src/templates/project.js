import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <h1>{data.sanityProject.title}</h1>
      <p>{data.sanityProject.description}</p>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    sanityProject(slug: { current: { eq: $slug } }) {
      title
      description
    }
  }
`

export default Project
