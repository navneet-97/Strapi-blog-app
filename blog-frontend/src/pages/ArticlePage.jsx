import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../api/strapi";

function ArticlePage() {

  const { documentId } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    loadArticle();
  }, []);

  async function loadArticle() {

    const res = await api.get(
      `/articles/${documentId}?populate=*`
    );

    setArticle(res.data.data);
  }

  if (!article)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  const image =
    "http://localhost:1337" +
    article.cover.url;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">

      <img
        src={image}
        alt={article.title}
        className="w-full rounded-xl mb-8"
      />

      <h1 className="text-5xl font-bold">
        {article.title}
      </h1>

      <p className="text-gray-500 mt-3">
        {article.author?.name}
      </p>

      <div className="prose prose-lg max-w-none mt-10">

        {article.blocks
          ?.filter(
            block =>
              block.__component ===
              "shared.rich-text"
          )
          .map(block => (
            <ReactMarkdown key={block.id}>
              {block.body}
            </ReactMarkdown>
          ))}

      </div>

    </main>
  );
}

export default ArticlePage;