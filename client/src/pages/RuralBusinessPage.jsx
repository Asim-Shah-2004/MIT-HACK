import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import custom CSS for animations

const schemes = [
  {
    title: 'PM-KISAN',
    description: 'Pradhan Mantri Kisan Samman Nidhi scheme provides financial assistance to small and marginal farmers.',
    link: 'https://pmkisan.gov.in',
  },
  {
    title: 'MUDRA Yojana',
    description: 'Micro Units Development and Refinance Agency Yojana offers loans to small and micro-enterprises.',
    link: 'https://mudra.org.in',
  },
  {
    title: 'National Rural Livelihood Mission',
    description: 'Aims to enhance the livelihood of rural households.',
    link: 'https://aajeevika.gov.in',
  },
  {
    title: 'Pradhan Mantri Awas Yojana (PMAY)',
    description: 'Provides affordable housing to the urban poor with a focus on enhancing living conditions.',
    link: 'https://pmaymis.gov.in',
  },
  {
    title: 'Deendayal Antyodaya Yojana',
    description: 'Focuses on promoting self-employment and wage employment for rural poor.',
    link: 'https://aajeevika.gov.in/atyodaya',
  },
  {
    title: 'Soil Health Card Scheme',
    description: 'Aims to improve soil health and increase agricultural productivity by providing soil health cards.',
    link: 'https://www.nfsm.gov.in',
  },
];

const SchemeCard = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  return (
    <div className="min-h-screen bg-[#f4f1de] flex flex-col items-center py-10">
      <nav className="bg-[#2b580c] w-full py-4 mb-8">
        <ul className="flex justify-center space-x-8 text-white font-bold">
          <li><a href="#home" className="hover:text-yellow-400">Home</a></li>
          <li><a href="#schemes" className="hover:text-yellow-400">Schemes</a></li>
          <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
        </ul>
      </nav>

      <h1 className="text-3xl font-bold text-[#606c38] mb-6">Government Schemes for Rural Businesses</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-5">
        {schemes.map((scheme, index) => (
          <div key={index} className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="p-6 bg-[#588157] rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                  <h2 className="text-2xl font-bold text-white mb-3">{scheme.title}</h2>
                  <p className="text-white">{scheme.description}</p>
                </div>
              </div>
              <div className="flip-card-back bg-[#8fbb99] p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-white mb-3">Visit Official Website</h3>
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 underline hover:text-yellow-400"
                >
                  {scheme.link}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemeCard;
