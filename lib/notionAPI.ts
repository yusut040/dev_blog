import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
    auth: process.env.NOTION_TOKEN as string,
});

const n2m = new NotionToMarkdown({ notionClient: notion});

export const getAllPosts = async () => {
    const posts = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID as string,
        page_size: 100,
    });

    const allPosts = posts.results;

    return allPosts.map((post) =>{
        return getPageMetaData(post);
    });
};

const getPageMetaData = (post) =>{
    const getTags = (tags) =>{
        const allTags = tags.map((tag) =>{
            return tag.name;
        });
        return allTags;
    } 
    return{
       id: post.id,
       title: post.properties.名前.title[0].plain_text,
       description: post.properties.description.rich_text[0],
       date: post.properties.Date.rich_text[0].plain_text,
       slug: post.properties.Slug.rich_text[0].plain_text,
       tags: getTags(post.properties.タグ.multi_select),
    };
};

export const getSinglePost = async (slug) =>{
    const response = await notion.databases.query({
        database_id: "129b89118f5880279fb7f4fc79319b65",
        filter: {
            property: "Slug",
            formula: {
                string: {
                    equals: slug,
                },
            },
        },
    });

    //記事のメタデータを取得する
    const page = response.results[0];
    const metadata = getPageMetaData(page);

    //記事内の記述をマークダウン形式で取得してString変換する。
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
        metadata: metadata,
        markdown: mdString,
    };
};

export const getPostForTop = async () => {
    const fourPosts = await getAllPosts();
    const result = fourPosts.slice(0,NUMBER_OF_POSTS_PER_PAGE);
    return result;
}

/* ページ番号に応じた記事を出力する。*/
export const getPostsByPage = async (page: number) => {
    const allPosts = await getAllPosts();
    await console.log(allPosts);
    const startIndex = (page - 1 ) * NUMBER_OF_POSTS_PER_PAGE;
    const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
    
    return (await allPosts).slice(startIndex, endIndex);
}

export const getNumberOfPages = async () => {
    const allPosts = await getAllPosts();
    return Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
        (allPosts.length % NUMBER_OF_POSTS_PER_PAGE) >
        0
        ? 1
        : 0;
};