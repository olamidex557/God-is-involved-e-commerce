import QuoteColumn from "../../../components/admin/quotations/QuoteColumn";

const residential = [
  {
    id: "Q-101",
    client: "Olamide",
    project:
      "Luxury Apartment",
    budget:
      "₦1,200,000",
  },
];

const commercial = [
  {
    id: "Q-102",
    client:
      "TechHub Ltd",
    project:
      "Office Interior",
    budget:
      "₦4,500,000",
  },
];

const office = [
  {
    id: "Q-103",
    client:
      "Creative Studio",
    project:
      "Workspace Fitout",
    budget:
      "₦2,800,000",
  },
];

const hospitality = [
  {
    id: "Q-104",
    client:
      "Sunrise Hotel",
    project:
      "Lobby Renovation",
    budget:
      "₦8,000,000",
  },
];

const Quotations = () => {
  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Quotations
        </h1>

        <p className="text-white/50 mt-2">
          Manage quote requests
          by project type.
        </p>
      </div>

      <div
        className="
        grid
        xl:grid-cols-4
        gap-6
        "
      >
        <QuoteColumn
          title="Residential"
          quotes={
            residential
          }
        />

        <QuoteColumn
          title="Commercial"
          quotes={
            commercial
          }
        />

        <QuoteColumn
          title="Office"
          quotes={office}
        />

        <QuoteColumn
          title="Hospitality"
          quotes={
            hospitality
          }
        />
      </div>
    </>
  );
};

export default Quotations;