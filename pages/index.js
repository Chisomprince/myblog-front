import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Tag from '../components/Tag'
import imageToUrl from '../lib/imageToUrl'
import Image from 'next/image'

export default function Home({posts}) {
  const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }
  const MAX_DISPLAY = 5
  console.log(posts)
  return (
    <Layout>
    <div >
      <Head>
        <title>CTIR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='divide-y divide-gray-200 dark:divide-gray-700'>
        
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Latest articles and tutorial for chisom prince
            {/* {siteMetadata.description} */}
          </p>
        </div>
         <ul className="">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, published_at, title, summary, categories,hero } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 space-x-4 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">

                    <img src={imageToUrl(hero.url)} layout='fill' className='w-full h-40 object-cover md:h-72 lg:max-h-40 rounded '/>
                   
                    <div className="space-y-5 xl:col-span-3 ">
                       
                      <div className="space-y-6">
                        
                        <div>
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                              <time dateTime={published_at}>
                                {new Date(published_at).toLocaleDateString('en-US',postDateTemplate)}
                              </time>
                            </dd>
                          </dl>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight line-clamp-2">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100  "
                            >
                              
                                {title}
                              
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                             {categories.map((item) => (
                              <Tag key={item} text={item.title} slug={item.slug}/>
                            ))} 
                          </div>
                        </div>
                       
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
         {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
       
      </main>

    </div>
  </Layout>
  )
}

export const getStaticProps = async()=>{
  const posts = await(await fetch('http://localhost:1337/articles')).json()
  return{
    props:{
      posts
    }
  }
}