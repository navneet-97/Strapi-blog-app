import ArticleCard from "./ArticleCard";

function ArticleList({ articles }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-12">

      <h2 className="text-3xl font-bold mb-8">
        Latest Articles
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <ArticleCard
            key={article.documentId}
            article={article}
          />
        ))}
      </div>

    </section>
  );
}

export default ArticleList;