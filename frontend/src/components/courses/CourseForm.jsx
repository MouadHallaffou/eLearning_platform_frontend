import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { course, tag, category } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../common/Loader";

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Le titre est obligatoire"),
    description: Yup.string().required("La description est obligatoire"),
    category_id: Yup.string().required("La catégorie est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      cover: null,
      duration: "",
      level: "",
      category_id: "",
      tag_ids: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          if (key === 'tag_ids') {
            value.forEach(tagId => formData.append('tag_ids[]', tagId));
          } else if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });

        if (id) {
          await course.updateCourse(id, formData);
          toast.success("Cours mis à jour avec succès");
        } else {
          await course.createCourse(formData);
          toast.success("Cours créé avec succès");
        }

        navigate("/courses");
      } catch (error) {
        console.error("Erreur:", error);
        if (error.response?.data?.errors) {
          Object.values(error.response.data.errors)
            .flat()
            .forEach(err => toast.error(err));
        } else {
          toast.error(error.response?.data?.message || "Une erreur est survenue");
        }
      } finally {
        setLoading(false);
      }
    },
    enableReinitialize: true
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("cover", file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = document.getElementById('cover-preview');
        if (preview) preview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagChange = (tagId, isChecked) => {
    const newTags = isChecked
      ? [...formik.values.tag_ids, tagId]
      : formik.values.tag_ids.filter(id => id !== tagId);
    
    formik.setFieldValue("tag_ids", newTags);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          category.getCategories(),
          tag.getTags(),
        ]);

        setCategories(categoriesResponse.data.data);
        setTags(tagsResponse.data.data);

        if (id) {
          const courseResponse = await course.getCourse(id);
          const courseData = courseResponse.data.data;
          
          const normalizeTags = (tags) => {
            if (!tags) return [];
            if (Array.isArray(tags)) return tags;
            if (typeof tags === 'object') return Object.values(tags);
            return [];
          };

          const tagIds = normalizeTags(courseData.tags).map(t => t?.id).filter(id => id !== undefined);

          formik.setValues({
            title: courseData.title || "",
            description: courseData.description || "",
            content: courseData.content || "",
            cover: courseData.cover 
              ? `${import.meta.env.VITE_API_BASE_URL}/storage/${courseData.cover}`
              : null,
            duration: courseData.duration || "",
            level: courseData.level || "",
            category_id: courseData.category_id || "",
            tag_ids: tagIds,
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
        setInitialDataLoaded(true);
      }
    };

    fetchInitialData();
  }, [id]);

  if (loading && !initialDataLoaded) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
            <h2 className="text-2xl font-bold">
              {id ? "Modifier le Cours" : "Créer un Nouveau Cours"}
            </h2>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                            {/* Titre */}
                            <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Titre du cours *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                />
                {formik.errors.title && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                />
                {formik.errors.description && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                )}
              </div>

              {/* Contenu détaillé */}
              <div className="sm:col-span-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Contenu détaillé
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={6}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                />
              </div>

              {/* Durée */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Durée (heures)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  min="0"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                />
              </div>

              {/* Niveau */}
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                  Niveau
                </label>
                <select
                  id="level"
                  name="level"
                  value={formik.values.level}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                >
                  <option value="">Sélectionnez un niveau</option>
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Avancé</option>
                </select>
              </div>

              {/* Catégorie */}
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                  Catégorie *
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formik.values.category_id}
                  onChange={formik.handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formik.errors.category_id && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.category_id}</p>
                )}
              </div>

              {/* Image de couverture */}
              <div className="sm:col-span-2">
                <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
                  Image de couverture
                </label>
                <input
                  type="file"
                  id="cover"
                  name="cover"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {(formik.values.cover) && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Image {id ? "actuelle" : "sélectionnée"} :</p>
                    <img
                      id="cover-preview"
                      src={
                        formik.values.cover instanceof File
                          ? URL.createObjectURL(formik.values.cover)
                          : formik.values.cover
                      }
                      alt="Prévisualisation"
                      className="h-32 object-contain rounded mt-1 border"
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <label 
                      key={tag.id}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                        formik.values.tag_ids.includes(tag.id)
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formik.values.tag_ids.includes(tag.id)}
                        onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                        className="hidden"
                      />
                      {tag.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/courses")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {id ? "Mise à jour..." : "Création..."}
                    </>
                  ) : id ? (
                    "Mettre à jour"
                  ) : (
                    "Créer le cours"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;