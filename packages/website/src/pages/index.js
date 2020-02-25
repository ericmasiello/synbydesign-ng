import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Example } from '@synbydesign/common-ui';
import '@synbydesign/common-ui/dist/index.css'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Resume from '../components/resume/Resume';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query PortfolioLandingPage {
      allPortfolio: allMarkdownRemark(filter: {fields: {slug: {ne: "/resume/"}}}) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            coverImage {
              src
              alt
            }
            meta {
              thumb {
                row
                column
              }
            }
          }
        }
      }
      allCoverImages: allImageSharp {
        nodes {
          id
          resize {
            originalName
          }
        }
      }
      resume: markdownRemark(fileAbsolutePath: {regex: "/data/resume/"}) {
        frontmatter {
          lead
          ownerName
          ownerTitle
          professionalExperience {
            accomplishments
            organization
            roles {
              title
              yearFrom
              yearTo
            }
          }
          relatedExperience {
            accomplishments
            meta
            role {
              title
              yearFrom
              yearTo
            }
            title
            website {
              url
            }
          }
          skills
          education {
            degree
            institution
            location
            year
          }
        }
      }
    }
  `)

  return (
      <Layout>
        <SEO title="Home" />
        <Resume {...data.resume.frontmatter} />
        <h1>Hi people</h1>
        <pre style={{ maxWidth: '100%', overflow: 'auto', }}>
          {JSON.stringify(data.resume.frontmatter, null, 2)}
        </pre>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Example>
          Hello World
        </Example>
        <ul>
          {data.allPortfolio.nodes.map(item => (
            <li key={item.id}>
              <article>
                <h2><Link to={item.fields.slug}>{item.frontmatter.title}</Link></h2>
              </article>
            </li>
          ))}
        </ul>

      </Layout>
    )
  }

export default IndexPage
