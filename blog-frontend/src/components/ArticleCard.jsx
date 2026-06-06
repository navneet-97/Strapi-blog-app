import { Link } from "react-router-dom";

function ArticleCard({ article }) {

  const image =
    "http://localhost:1337" +
    article.cover?.formats?.medium?.url;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow">

      <img
        src={image}
        alt={article.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">

        <span className="text-sm text-blue-500">
          {article.category?.name}
        </span>

        <h2 className="text-xl font-bold mt-2">
          {article.title}
        </h2>

        <p className="text-gray-600 mt-3">
          {article.description}
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-sm">
            {article.author?.name}
          </span>

          <Link
            to={`/article/${article.documentId}`}
            className="font-semibold"
          >
            Read →
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ArticleCard;