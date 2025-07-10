import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import TopicPage from "./pages/TopicPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import AllArticles from "./pages/AllArticles";
import AllTopics from "./pages/AllTopics";
import { Container, CssBaseline, Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/topics" element={<AllTopics />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/topics/:topic_slug" element={<TopicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
