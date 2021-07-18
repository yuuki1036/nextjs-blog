export type PostData = {
  title: string;
  date: string;
  contentHtml: string;
};

export type PostProps = {
  postData: PostData;
};

export type ListData = {
  date: string;
  title: string;
  id: string;
};

export type HomeProps = {
  allPostsData: ListData[];
};
