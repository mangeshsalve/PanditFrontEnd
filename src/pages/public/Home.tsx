import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const Home = () => {
  const { t } = useTranslation();

   const token = localStorage.getItem("token");
   const role = localStorage.getItem("role");
   let chatPath = "/login";

    if (token) {
      if (role === "PANDIT") {
        chatPath = "/pandit-dashboard";
      } else {
        chatPath = "/select-pandit";
      }
    }

    const services = [
    { id: 1, name: t("ganeshPuja") },
    { id: 2, name: t("satyanarayanPuja") },
    { id: 3, name: t("vastuShanti") },
  ];

 return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t("welcome")}
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            {t("heroSubtitle")}
          </p>

          <Link
            to={chatPath}
            className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-semibold shadow-xl hover:scale-105 transition duration-300"
          >
            {t("chatWithPandit")}
          </Link>
        </div>
      </section>


      {/* SERVICES SECTION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            {t("ourServices")}
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("serviceDescription")}
                </p>
                <button className="bg-orange-600 text-white px-5 py-2 rounded-xl hover:opacity-90">
                  {t("bookNow")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {t("experiencedPandits")}
            </h3>
            <p className="text-gray-600">
              {t("experiencedPanditsDesc")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              {t("verifiedProfiles")}
            </h3>
            <p className="text-gray-600">
              {t("verifiedProfilesDesc")}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              {t("easyBooking")}
            </h3>
            <p className="text-gray-600">
              {t("easyBookingDesc")}
            </p>
          </div>
        </div>
      </section>


      {/* CTA SECTION */}
      <section className="bg-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t("readyToBegin")}
          </h2>
          <p className="text-lg mb-10 opacity-90">
            {t("ctaSubtitle")}
          </p>

          <Link
            to="/login"
            className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            {t("chatWithPandit")}
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
