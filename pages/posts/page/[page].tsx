import { getAllPosts, getNumberOfPages, getPostsByPage } from "@/lib/notionAPI";
import SinglePost from "../../../components/Post/SinglePost";
import { getPostForTop } from "../../../lib/notionAPI";
import Pagenation from "@/components/Pagenation/Pagenation";

export const getStaticPaths = async() => {
  const numberOfPage = await getNumberOfPages();
  
  let params = [];

  for (let i = 1; i<= numberOfPage; i++) {
    params.push({ params:{ page: i.toString() } });
  }
    return {
        paths: params,
        fallback: "blocking",
    }
  }


export const getStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const postByPage = await getPostsByPage(parseInt(currentPage.toString(), 10));
  const numberOfPage = await getNumberOfPages();
  return{
    props: {
      postByPage,
      numberOfPage
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

const blogPageList = ({postByPage,numberOfPage}) => {
  //console.log(postByPage);
  //console.log(numberOfPage);

  return (
      <div className="container h-full w-full mx-auto">
        <main className="container w-full mt-16">
          <h1 className="text-4xl font-medium text-center mb-16">投稿一覧</h1>
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
          <Pagenation numberOfPage={numberOfPage}/>
        </main>
      </div>
  )
}

export default blogPageList;