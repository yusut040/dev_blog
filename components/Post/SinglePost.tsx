import React from 'react'
import Link from "next/link";

type Props = {
    title: string
    description: string
    date: string
    tags: string[]
    slug: string
    isPagenationPage: boolean
  }

function SinglePost(props: Props) {
  const {title,description,date,tags,slug,isPagenationPage} = props;
  
  if(!isPagenationPage){
    return (
      <>
        <Link href={`/posts/${slug}`}>
          <section 
            className="lg:w-1/2 bg-sky-800 mb-3 mx-auto rounded-md p-4 shadow-2xl
            hover:shadow-none hover:translate-y-1 transition-all duration-300">
              <div className='text-gray-100 flex items-center gap-3 '>
                <h2 className='text-2xl font-medium'>{title}</h2>
                <div>{date}</div>
                {tags.map((tag)=>(<span key={tag} className='bg-gray-500 rounded-xl px-2 pd-1 font-medium'>{tag}</span>))}
              </div>
            <p className='text-gray-100'>{description.plain_text}</p>
          </section>
        </Link>
      </>
    )
  }else{
    return (
      <>
        <Link href={`/posts/${slug}`}>
          <section 
            className="bg-sky-800 mb-3 mx-auto rounded-md p-4 shadow-2xl
                       hover:shadow-none hover:translate-y-1 transition-all duration-300">
            <div className='text-gray-100 flex items-center gap-3 '>
              <h2 className='text-2xl font-medium'>{title}</h2>
                <div>{date}</div>
              {tags.map((tag)=>(<span key={tag} className='bg-gray-500 rounded-xl px-2 pd-1 font-medium'>{tag}</span>))}
            </div>
              <p className='text-gray-100'>{description.plain_text}</p>
          </section>
        </Link>
      </>
    )
  }
}

export default SinglePost;