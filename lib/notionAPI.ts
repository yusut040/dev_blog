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

    const page = response.results[0];
    const metadata = getPageMetaData(page);

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
        metadata: metadata,
        markdown: mdString,
    };
};