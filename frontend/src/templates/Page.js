import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import Image from "gatsby-image"
import BlockContent from "@sanity/block-content-to-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import client from "../api/client"

const Page = props => {
  const { title, body } = props.data.sanityPage
  const language = props.pageContext.language
  return (
    <Layout>
      <SEO title={title.translate} />
      <h1>{title.translate}</h1>
      <BlockContent
        blocks={language === "en" ? body._rawEn : body._rawDe}
        imageOptions={{ fit: "max" }}
        {...client.config()}
      />
    </Layout>
  )
}

export const query = graphql`
  query Page($page: String, $language: String) {
    sanityPage(id: { eq: $page }) {
      title {
        translate(language: $language)
      }
      body {
        _rawDe
        _rawEn
      }
    }
  }
`

export default Page
