import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CourseList from "./components/courses/CourseList";
import CourseForm from "./components/courses/CourseForm";
import CourseCard from "./components/courses/CourseCard";
import HomePage from "./pages/HomePage";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6"><Outlet /></main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="courses/new" element={<CourseForm />} />
          <Route path="courses/edit/:id" element={<CourseForm />} />
          <Route path="courses/:id" element={<CourseCard />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
