import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirName = path.join(process.cwd(), "posts");

// 一覧表示用
export const getSortedPostsData = () => {
  // /posts 配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirName);
  const allPostsData = fileNames.map((fileName) => {
    // ファイル名からid取得
    const id = fileName.replace(/\.md$/, "");
    // .mdファイルを文字列として読み取る
    const fullPath = path.join(postsDirName, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // gray-matterで解析
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
  // 日付でソート
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

// 動的ルート作成用
export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirName);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = async (id) => {
  // .mdファイルを文字列として読み取る
  const fullPath = path.join(postsDirName, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // gray-matterで解析
  const matterResult = matter(fileContents);
  // remarkでHTMLに変換
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};
