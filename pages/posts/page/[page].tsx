import { getAllPosts, getPostsByPage } from "@/lib/notionAPI";
import SinglePost from "../../../components/Post/SinglePost";
import { getPostForTop } from "../../../lib/notionAPI";

export const getStaticPaths = async() => {
  console.log("getStaticPaths実行");
    return {
        paths: [{ params: {page: "1"} }, { params: {page: "2"} }],
        fallback: "blocking",
      }
  }

export const getStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const postByPage = await getPostsByPage(parseInt(currentPage.toString(), 10));
  
  return{
    props: {
      postByPage,
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
  isPagenationPage: boolean
}

const blogPageList = ({postByPage}) => {
  return (
      <div className="container h-full w-full mx-auto">
        <main className="container w-full mt-16">
          <h1 className="text-4xl font-medium text-center mb-16">ページ１</h1>
          <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto" >
            {postByPage.map((post:Posts)=>(
              <div key={post.id}>
                <SinglePost 
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPagenationPage={true}
              />
            </div>
            ))}
          </section>
        </main>
      </div>
  )
}

export default blogPageList;