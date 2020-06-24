import { Link } from "gatsby"
import React, { useContext } from "react"
import { AlternateLinksContext } from "./wrapWithI18nProvider"
import { useTranslation } from "react-i18next"
import { useStaticQuery, graphql } from "gatsby"

const Header = props => {
  const alternateLinks = useContext(AlternateLinksContext)
  const { t, i18n } = useTranslation("common")

  console.log(i18n.language)

  const menu = useStaticQuery(graphql`
    query HeaderQuery {
      allSanityPage {
        nodes {
          slug {
            en {
              current
            }
            de {
              current
            }
          }
          title {
            de
            en
          }
        }
      }
    }
  `)

  console.log(menu)

  return (
    <header
      style={{
        background: `#ffce00`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to={"/" + i18n.language}
            style={{
              color: `black`,
              textDecoration: `none`,
            }}
          >
            {t("title")}
          </Link>
        </h1>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          {menu.allSanityPage.nodes.map((page, i) => {
            return (
              <li style={{ margin: "0 1rem 0 0" }} key={i}>
                <Link
                  to={`/${i18n.language}/${page.slug[i18n.language].current}`}
                  style={{
                    color: `black`,
                    textDecoration: `none`,
                  }}
                >
                  {page.title[i18n.language]}
                </Link>
              </li>
            )
          })}
          {alternateLinks &&
            alternateLinks
              .filter(link => link.language !== i18n.language)
              .map((link, i) => [
                i > 0 && " | ",
                <li key={i} style={{ margin: "0" }}>
                  <Link
                    to={link.path}
                    style={{
                      color: `black`,
                      textDecoration: `none`,
                      fontSize: "0.8em",
                      textTransform: "uppercase",
                      borderLeft: "1px solid black",
                      paddingLeft: "1rem",
                    }}
                    hrefLang={link.language}
                  >
                    {t(link.language)}
                  </Link>
                </li>,
              ])}
        </ul>
      </div>
    </header>
  )
}

export default Header
