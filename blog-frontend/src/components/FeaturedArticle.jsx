import { Link } from "react-router-dom";

function FeaturedArticle({ article }) {

  if (!article) return null;

  const image =
    "http://localhost:1337" +
    article.cover.url;

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">

        <img
          src={image}
          alt={article.title}
          className="rounded-xl h-100 w-full object-cover"
        />

        <div>
          <span className="text-sm text-blue-600 font-medium">
            {article.category?.name}
          </span>

          <h1 className="text-5xl font-bold mt-4">
            {article.title}
          </h1>

          <p className="text-gray-600 mt-4">
            {article.description}
          </p>

          <div className="mt-6">
            <Link
              to={`/article/${article.documentId}`}
              className="bg-black text-white px-5 py-3 rounded-lg"
            >
              Read Article
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedArticle;