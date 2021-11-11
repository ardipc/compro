import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import { absoluteUrl } from '../../middleware/utils'

import moment from 'moment-timezone';
import { NextSeo } from 'next-seo';
import { Fragment } from 'react';

export async function getServerSideProps({req, query}) {

  const { slug } = query;
  const { origin } = absoluteUrl(req);
  const fetchPosts = await fetch(`${origin}/api/posts/slug?slug=${slug}`);
  const posts = await fetchPosts.json();
  console.log(posts)
  return {
    props: {
      posts
    },
    // will be passed to the page component as props
  }
}

export default function Slug(props) {
  const { posts: { result } } = props
  return (
    <Fragment>
      <NextSeo
        title={result.title}
        content={result.content}
        openGraph={{
          url: result.slug,
          title: result.title,
          content: result.content,
          images: [
            {
              url: result.cover,
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
            {
              url: result.cover,
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
              type: 'image/jpeg',
            },
            { url: result.cover }
          ],
          site_name: result.title
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>{result.title}</h1>
        <div style={{position: 'relative', height: 420, width: '80%'}}>
          <Image src={result.cover} layout='fill' objectFit="cover" alt="Cover post" />
        </div>
        <p>{result.content}</p>
        <small>{moment(result.createdAt).format('LLL')}</small>

        <Link href="/"><a style={{marginTop: '20px'}}>Kembali</a></Link>
      </main>
    </Fragment>
  );
}