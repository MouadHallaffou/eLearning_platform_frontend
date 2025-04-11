import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCourse } from "../../services/api"; 

const CourseCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const { data } = await getCourse(id); 
        setCourse(data);
      } catch (error) {
        console.error("Erreur lors du chargement du cours:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mt-4">Cours non trouvé</h2>
        <p className="text-gray-500 mt-2">Le cours que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link
          to="/courses"
          className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Retour à la liste des cours
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Barre de navigation et actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="breadcrumbs text-sm text-gray-600 mb-4 md:mb-0">
          <Link to="/" className="hover:text-purple-600">Accueil</Link>
          <span className="mx-2">/</span>
          <Link to="/courses" className="hover:text-purple-600">Cours</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{course.title}</span>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/courses/edit/${course.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center transition-colors shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
            Modifier
          </Link>
          
          <Link
            to="/courses"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center transition-colors shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour
          </Link>
        </div>
      </div>

      {/* En-tête du cours */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-t-lg shadow-md p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-1">
            {course.category_name && (
              <span className="inline-block px-3 py-1 bg-white text-purple-800 text-sm font-medium rounded-full mb-3">
                {course.category_name}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags &&
                course.tags.split(", ").map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-800 bg-opacity-50 text-white text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm mt-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{course.duration} Heure{course.duration > 1 ? 's' : ''}</span>
              </div>
              
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Niveau: {course.level}</span>
              </div>
              
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Mis à jour le: {new Date(course.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-1 rounded-lg shadow-lg overflow-hidden">
              {course.cover ? (
                <img
                  src={course.cover}
                  alt={`Couverture pour ${course.title}`}
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
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
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white shadow-md rounded-b-lg mb-8">
        <div className="flex border-b">
          <button
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "description"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "content"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("content")}
          >
            Contenu du cours
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="p-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">À propos de ce cours</h2>
              <p className="text-gray-600 mb-6 whitespace-pre-line">
                {course.description}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ce que vous allez apprendre</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {course.objectives && course.objectives.split("\n").map((objective, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Prérequis</h3>
              <ul className="mb-6">
                {course.prerequisites ? (
                  course.prerequisites.split("\n").map((prerequisite, index) => (
                    <li key={index} className="flex items-start mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-700">{prerequisite}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">Aucun prérequis nécessaire.</p>
                )}
              </ul>
            </div>
          )}

          {activeTab === "content" && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contenu du cours</h2>
              
              {course.content ? (
                <div className="space-y-4">
                  {course.content.split("\n\n").map((section, sectionIndex) => {
                    const [title, ...items] = section.split("\n");
                    return (
                      <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-100 px-4 py-3 font-medium text-gray-800">
                          {title}
                        </div>
                        <ul className="divide-y divide-gray-200">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex} className="px-4 py-3 flex items-center text-gray-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-3 text-purple-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {item.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600">Aucun contenu disponible pour ce cours.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations supplémentaires</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Instructeur</span>
            <span className="text-gray-800 font-medium">
              {course.instructor_name || "Non spécifié"}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Langage</span>
            <span className="text-gray-800 font-medium">
              {course.language || "Français"}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Dernière mise à jour</span>
            <span className="text-gray-800 font-medium">
              {new Date(course.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions en bas de page */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/courses')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition-colors"
        >
          Retour à la liste
        </button>
        
        <div className="flex space-x-3">
          <Link
            to={`/courses/edit/${course.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Modifier
          </Link>
          
          <button
            onClick={() => {
              // Code pour supprimer le cours, puis rediriger
              if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
                // handleDelete(course.id);
                navigate('/courses');
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;