import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../api/strapi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ArticlePage() {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const { documentId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    loadArticle();
  }, [documentId]);

  async function loadArticle() {
    try {
      const res = await api.get(
        `/articles/${documentId}?populate=*`
      );

      setArticle(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        Loading...
      </div>
    );
  }

  const image =
    article.cover?.url
      ? `http://localhost:1337${article.cover.url}`
      : null;


  const isAuthor = user && article.postedBy && user.id === article.postedBy?.id;

  async function deleteArticle() {
    try {
      await api.delete(
        `/articles/${documentId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">

      {image && (
        <img
          src={image}
          alt={article.title}
          className="w-full h-112.5 object-cover rounded-2xl mb-8"
        />
      )}

      <div className="mb-8">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-slate-500">
          <span>
            By {article.postedBy?.username}
          </span>
          <span>•</span>
          <span>
            {article.category?.name}
          </span>
        </div>
      </div>

      {isAuthor && (
        <div className="flex gap-3 mb-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={deleteArticle}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      )}

      <div className="bg-slate-50 border rounded-xl p-5 mb-10">
        <p className="text-lg text-slate-700 italic">
          {article.excerpt}
        </p>
      </div>

      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>
          {article.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}

export default ArticlePage;