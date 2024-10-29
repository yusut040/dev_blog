import { getAllPosts } from "@/lib/notionAPI";
import SinglePost from "../components/Post/SinglePost";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();
  return{
    props: {
      allPosts,
    },
    revalidate: 60,
  };
};

type Posts = {
  id: string
  title: string
  description: string
  tags: string []
  date: string
  slug: string
}

export default function Home({allPosts}: {allPosts: Array<Posts>}) {
  return (
      <div className="container h-full w-full mx-auto">
        <main className="container w-full mt-16">
          <h1 className="text-5xl font-medium text-center mb-16">t0y0のつぶやきブログ</h1>
          {allPosts.map((post)=>(
            <div className="mx-4" key={post.id}>
              <SinglePost 
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              />
            </div>
          ))}
        </main>
      </div>
  )
}
