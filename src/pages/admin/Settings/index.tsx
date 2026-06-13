import SettingsSection from "../../../components/admin/settings/SettingsSection";

const sections = [
  {
    title: "Store Information",
    description:
      "Manage store name, logo, branding and contact information.",
  },
  {
    title: "Business Details",
    description:
      "Company registration, tax information and business profile.",
  },
  {
    title: "Payment Settings",
    description:
      "Configure Paystack, Flutterwave and payment processing.",
  },
  {
    title: "Shipping Settings",
    description:
      "Manage delivery zones, fees and logistics providers.",
  },
  {
    title: "Notifications",
    description:
      "Control emails, SMS alerts and admin notifications.",
  },
  {
    title: "Security",
    description:
      "Roles, permissions, authentication and access control.",
  },
];

const Settings = () => {
  return (
    <>
      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Settings
        </h1>

        <p className="text-white/50 mt-2">
          Configure your entire
          business platform.
        </p>
      </div>

      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        "
      >
        {sections.map(
          (
            section,
            index
          ) => (
            <SettingsSection
              key={index}
              title={section.title}
              description={section.description}
            />
          )
        )}
      </div>
    </>
  );
};

export default Settings;