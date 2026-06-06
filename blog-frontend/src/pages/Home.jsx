import { useEffect, useState } from "react";
import api from "../api/strapi";

import Navbar from "../components/Navbar";
import FeaturedArticle from "../components/FeaturedArticle";
import ArticleList from "../components/ArticleList";

function Home() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {

    const res = await api.get(
      "/articles?populate=*"
    );

    setArticles(res.data.data);
  }

  return (
    <>
      <FeaturedArticle
        article={articles[0]}
      />

      <ArticleList
        articles={articles}
      />
    </>
  );
}

export default Home;