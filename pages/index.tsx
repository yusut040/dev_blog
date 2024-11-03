import { getAllPosts } from "@/lib/notionAPI";
import SinglePost from "../components/Post/SinglePost";
import { getPostForTop } from "../lib/notionAPI";
import Link from 'next/link';
import NUMBER_OF_POSTS_PER_PAGE from "./../constants/constants";

export const getStaticProps = async () => {
  //引数で表示させる記事数をコントロールできる（レイアウト編集時使用）
  const fourPosts = await getPostForTop();
  return{
    props: {
      fourPosts,
    },
    revalidate: 60,
  };
};

// export const getStaticProps = async () => {
//   const allPosts = await getAllPosts();
//   return{
//     props: {
//       allPosts,
//     },
//     revalidate: 60,
//   };
// };

type Posts = {
  id: string
  title: string
  description: string
  tags: string []
  date: string
  slug: string
}

export default function Home({fourPosts}: {fourPosts: Array<Posts>}) {
  return (
      <div className="container h-full w-full mx-auto">
        <main className="container w-full mt-16">
          <h1 className="text-5xl font-medium text-center mb-16">to4oのつぶやきブログ</h1>
          {fourPosts.map((post)=>(
            <div className="mx-4" key={post.id}>
              <SinglePost 
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPagenationPage={false}
              />
            </div>
          ))}
            <Link 
              href="/posts/page/1" 
              className="mb-6 lg:w-1/2 mx-auto rounded-md text-right block hover:text-blue-500">
                <h3>...もっと見る</h3>
            </Link>
        </main>
      </div>
  )
}
