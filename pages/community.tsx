import React from 'react'
import styled from 'styled-components'
import { DynamicLink } from 'components/ui/DynamicLink'
import { GetStaticProps } from 'next'

import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
  MarkdownContent,
} from 'components/layout'
import { InlineTextarea } from 'react-tinacms-inline'
import { Button, ButtonGroup } from 'components/ui'
import { EmailForm } from 'components/forms'
import { NextSeo } from 'next-seo'
import { InlineGithubForm } from 'components/layout/InlineGithubForm'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { useGithubJsonForm } from 'react-tinacms-github'
import { InlineWysiwyg } from 'components/inline-wysiwyg'
import { usePlugin, useCMS } from 'tinacms'

function CommunityPage({ file: community, metadata, preview }) {
  const cms = useCMS()

  // Registers Tina Form
  const [data, form] = useGithubJsonForm(community, {
    label: 'Community Page',
    fields: [
      {
        label: 'Headline',
        name: 'headline',
        description: 'Enter the main headline here',
        component: 'text',
      },
      {
        label: 'Community Image',
        name: 'img',
        component: 'group',
        fields: [
          {
            label: 'Image',
            name: 'src',
            component: 'image',
            parse: media => {
              if (!media) return ''
              return media.id
            },
            uploadDir: () => '/img/',
          },
          { label: 'Alt Text', name: 'alt', component: 'text' },
        ],
      },
      {
        label: 'Secondary Headline',
        name: 'supporting_headline',
        description: 'Enter the secondary headline here',
        component: 'textarea',
      },
      {
        label: 'Secondary Body Copy',
        name: 'supporting_body',
        description: 'Enter the body copy here',
        component: 'markdown',
      },
      {
        label: 'Newsletter Header',
        name: 'newsletter_header',
        component: 'text',
      },
      {
        label: 'Newsletter CTA',
        name: 'newsletter_cta',
        component: 'text',
      },
    ],
  })

  usePlugin(form)

  return (
    <InlineGithubForm form={form}>
      <Layout>
        <NextSeo
          title={data.title}
          description={data.description}
          openGraph={{
            title: data.title,
            description: data.description,
          }}
        />
        <Hero>
          <InlineTextarea name="headline" />
        </Hero>
        {/* <SocialBar>
          <SocialItem>
            <a
              href={`${metadata.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIconSvg />
              <h5>Tweet us</h5>
            </a>
            <span className="dotted-line" />
          </SocialItem>
          <SocialItem>
            <a
              href={`${metadata.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIconSvg />
              <h5>Fork us</h5>
            </a>
            <span className="dotted-line" />
          </SocialItem>
          <SocialItem>
            <a
              href={`${metadata.social.forum}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ForumIconSvg />
              <h5>Ask us</h5>
            </a>
          </SocialItem>
        </SocialBar> */}
        <RichTextWrapper>
          <Section>
            <Wrapper>
              <InfoLayout>
                <InfoContent>
                  <InfoText>
                    <h2>
                      <InlineTextarea name="supporting_headline" />
                    </h2>
                    <hr />
                    <InlineWysiwyg name="supporting_body">
                      <MarkdownContent content={data.supporting_body} />
                    </InlineWysiwyg>
                  </InfoText>
                  <ButtonGroup>
                    <DynamicLink
                      href={'https://discord.gg/QC724mKx'}
                      passHref
                    >
                      <Button as="a">Discord</Button>
                    </DynamicLink>
                    <DynamicLink
                      href={'https://community.tinacms.org'}
                      passHref
                    >
                      <Button as="a">Forum</Button>
                    </DynamicLink>
                    <DynamicLink
                      href={'https://github.com/tinacms/tinacms'}
                      passHref
                    >
                      <Button as="a">GitHub</Button>
                    </DynamicLink>
                    <DynamicLink
                      href={'https://twitter.com/tina_cms'}
                      passHref
                    >
                      <Button as="a">Twitter</Button>
                    </DynamicLink>
                  </ButtonGroup>
                </InfoContent>
                <InfoImage src={data.img.src} alt={data.img.alt} />
              </InfoLayout>
            </Wrapper>
          </Section>
          <FormSection color="seafoam">
            <Wrapper>
              <h2>
                <InlineTextarea name="newsletter_header" />
              </h2>
              <p>
                <InlineTextarea name="newsletter_cta" />
              </p>
              <EmailForm />
            </Wrapper>
          </FormSection>
        </RichTextWrapper>
      </Layout>
    </InlineGithubForm>
  )
}

export default CommunityPage

/*
 ** DATA FETCHING -----------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const { default: metadata } = await import('../content/siteConfig.json')

  const previewProps = await getJsonPreviewProps(
    'content/pages/community.json',
    preview,
    previewData
  )
  return { props: { ...previewProps.props, metadata } }
}
/*
 ** STYLES ------------------------------------------------------
 */

const SocialBar = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-gap: 1.5rem;
  justify-content: center;
  margin: 3em auto 1rem auto;
  @media (min-width: 800px) {
    grid-template-rows: unset;
    grid-template-columns: repeat(4, auto);
    margin: 4rem auto;
    width: 700px;
  }
  @media (min-width: 1200px) {
    grid-column-gap: 2rem;
    margin: 6rem auto;
  }
`

const SocialItem = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  fill: var(--color-primary);

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--color-primary);
    font-family: var(--font-tuner);
    font-weight: regular;
    font-style: normal;
  }
  a:hover,
  a:focus {
    outline: none;
    text-decoration: none;
    color: var(--color-primary);
    svg {
      transform: scale3d(1.1, 1.1, 1.1);
      transition: transform 250ms ease-out;
    }
  }
  a:focus {
    text-decoration: underline;
  }
  svg {
    width: 4rem;
    margin-bottom: 1rem;
    transform: scale3d(1, 1, 1);
    transition: transform 180ms ease-in;
  }
  h5 {
    margin-bottom: 1rem;
    text-transform: uppercase;
    text-decoration: none;
  }
  span.dotted-line {
    display: block;
    height: 30px;
    border-left: 2px dotted var(--color-primary);
  }
  @media (min-width: 800px) {
    flex-direction: row;
    width: unset;
    align-items: flex-end;
    h5 {
      margin: 0;
    }
    span.dotted-line {
      height: 1px;
      width: 57px;
      border-left: unset;
      border-top: 3px dotted var(--color-primary);
      padding-bottom: 8px;
      margin-left: 20px;
    }
  }
  @media (min-width: 1200px) {
    span.dotted-line {
      margin-left: 32px;
    }
  }
`

const InfoLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: auto;
  grid-gap: 2rem;
  margin-bottom: 2rem;
  grid-template-areas: 'image' 'content';

  @media (min-width: 1200px) {
    margin-bottom: 4rem;
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    align-items: stretch;
    grid-template-areas: 'content image';
  }
`

const InfoContent = styled.div`
  grid-area: content;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

const InfoText = styled.div`
  margin-bottom: 1.5rem;
  h1,
  h2,
  h3,
  .h1,
  .h2,
  .h3 {
    text-align: center;
  }
  hr {
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 800px) {
    h1,
    h2,
    h3,
    .h1,
    .h2,
    .h3 {
      text-align: left;
    }
    hr {
      margin-left: 0;
      margin-right: 0;
    }
    flex: 1 0 auto;
  }
`

const InfoImage = styled(({ src, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <img src={src} alt="" />
    </div>
  )
})`
  display: block;
  grid-area: image;
  max-width: 65vw;
  margin: 0 auto;
  border-radius: 2rem;
  overflow: hidden;

  img {
    display: block;
    margin: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const FormSection = styled(Section)`
  @media (min-width: 800px) {
    text-align: center;

    form {
      margin: 0 auto;
    }
  }

  p {
    margin-bottom: 2rem;
    font-family: var(--font-tuner);
  }
`
