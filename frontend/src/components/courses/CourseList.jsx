import React, { useState, useEffect } from "react";
import { course } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await course.getCourses();
        console.log(response.data.data);
        
        setCourses(response.data.data);
      } catch (error) {
        setError(error.message || "Erreur lors du chargement des cours");
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await course.deleteCourse(courseId);
      setCourses(courses.filter((c) => c.id !== courseId));
    } catch (error) {
      setError(error.message || "Erreur lors de la suppression");
      console.error("Erreur suppression:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Erreur: {error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Liste des Cours</h1>
        <Link
          to="/courses/new"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Nouveau Cours
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253"
            />
          </svg>
          <p className="text-lg text-gray-500 mt-4">
            Aucun cours disponible pour le moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((courseItem) => (
            <div
              key={courseItem.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image de couverture du cours */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {courseItem.cover ? (
                  <img
                    src={courseItem.cover}
                    alt={`Couverture pour ${courseItem.title}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* Badge de niveau */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-white rounded-full shadow text-xs font-semibold text-gray-700">
                  Niveau: {courseItem.level}
                </div>

                {/* Badge de durée */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-white rounded-full shadow text-xs font-semibold text-purple-700">
                  {courseItem.duration} Heure
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3">
                  {/* Catégorie mise en évidence */}
                  {courseItem.category_name && (
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full mb-2">
                      {courseItem.category_name}
                    </span>
                  )}

                  {/* Titre du cours */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {courseItem.title}
                  </h3>

                  {/* Description tronquée */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {courseItem.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {courseItem.tags &&
                    courseItem.tags.split(", ").map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-300 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                  <Link
                    to={`/courses/${courseItem.id}`}
                    className="text-purple-600 hover:text-purple-800 p-1.5 hover:bg-purple-50 rounded-full transition-colors"
                    title="View details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </Link>

                  <button
                    onClick={() => navigate(`/courses/edit/${courseItem.id}`)}
                    className="text-yellow-600 hover:text-yellow-800 p-1.5 hover:bg-yellow-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDelete(courseItem.id)}
                    className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
