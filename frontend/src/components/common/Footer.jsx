import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    { path: "/about", name: "À propos" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <footer className="bg-gray-500 text-white">
      <div className="container mx-auto px-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section Logo */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-blue-300 hover:text-blue-300"
            >
              E-Learning
            </Link>
            <p className="mt-2 text-white">
              Plateforme d'apprentissage en ligne
            </p>
          </div>

          {/* Liens */}
          <div>
            <h3 className="text-lg text-blue-200 font-semibold">Liens nav</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg text-blue-200 font-semibold">Contact</h3>
            <address className="not-italic text-white">
              <p>casablanca maroc</p>
              <p className="mt-2">contact@mouad.com</p>
            </address>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-lg text-blue-200 font-semibold">Suivez-nous</h3>
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "LinkedIn", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white hover:text-white transition-colors"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                    {social.charAt(0)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-4 pt-4 text-center text-white">
          <p>© {new Date().getFullYear()} E-Learning. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;