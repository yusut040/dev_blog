import React from 'react';
import { getSinglePost,getAllPosts } from "../../lib/notionAPI";
import Markdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm'
import Link from 'next/link';


// eslint-disable-next-line @next/next/no-typos
export const getStaticPaths = async() => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({slug}) => ({params: { slug } }));

  return {
      paths: paths,
      fallback: "blocking",
    }
}

export const getStaticProps = async ({ params }) => {
    const post = await getSinglePost(params.slug);    
    return{
      props: {
        post: post,
      },
      revalidate: 60,
    };
  };

const post = ({post}) => {
    return(
        <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
            <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
            <div className="border-b-2"></div>
            <span className='text-gray-500'>投稿日：{post.metadata.date}</span>
            <br />
              {post.metadata.tags.map((tag:string) => (
                <p key={tag} className='text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2'>{tag}</p>
              ))}
            <div className="mt-10 font-medium">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const {children, className} = props
                  const match = /language-(\w+)/.exec(className || "")
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      // eslint-disable-next-line react/no-children-prop
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={vscDarkPlus}
                    />
                  ) : (
                    <code className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {post.markdown.parent}
            </Markdown>
            <Link href="/">
              <span className='pd-20 block mt-3 hover:text-blue-500 block'>←ホームに戻る</span>
            </Link>
          </div>
      </section>
    )
}

export default post;