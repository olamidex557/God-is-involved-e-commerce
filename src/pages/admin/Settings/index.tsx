import {
  useEffect,
  useState,
} from "react";

type SettingsForm = {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  logo: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  currency: string;
  taxEnabled: boolean;
  taxRate: number;
  deliveryEnabled: boolean;
  deliveryBaseFee: number;
  freeDeliveryThreshold: number;
  orderNotifications: boolean;
  lowStockNotifications: boolean;
  telegramEnabled: boolean;
  telegramChatId: string;
  emailEnabled: boolean;
  senderEmail: string;
  paystackEnabled: boolean;
  paystackPublicKey: string;
  profileName: string;
  profileEmail: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const STORAGE_KEY =
  "adminSettings";

const defaultSettings: SettingsForm = {
  businessName:
    "God Is Involved",
  businessEmail: "",
  businessPhone: "",
  businessAddress: "",
  logo: "",
  facebook: "",
  instagram: "",
  whatsapp: "",
  currency: "NGN",
  taxEnabled: false,
  taxRate: 0,
  deliveryEnabled: true,
  deliveryBaseFee: 0,
  freeDeliveryThreshold: 0,
  orderNotifications: true,
  lowStockNotifications: true,
  telegramEnabled: false,
  telegramChatId: "",
  emailEnabled: true,
  senderEmail: "",
  paystackEnabled: true,
  paystackPublicKey: "",
  profileName: "",
  profileEmail: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#D4AF37]/70";

const sectionClass =
  "rounded-2xl border border-white/10 bg-white/[0.03] p-5";

const Settings = () => {
  const [form, setForm] =
    useState(defaultSettings);

  const [status, setStatus] =
    useState("");

  useEffect(() => {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!saved) {
      return;
    }

    try {
      setForm({
        ...defaultSettings,
        ...JSON.parse(saved),
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      localStorage.removeItem(
        STORAGE_KEY
      );
    }
  }, []);

  const updateField = <
    Key extends keyof SettingsForm
  >(
    key: Key,
    value: SettingsForm[Key]
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const validate = () => {
    if (
      !form.businessName.trim()
    ) {
      return "Business name is required.";
    }

    if (
      form.businessEmail &&
      !/^\S+@\S+\.\S+$/.test(
        form.businessEmail
      )
    ) {
      return "Business email is invalid.";
    }

    if (
      form.taxRate < 0 ||
      form.deliveryBaseFee < 0 ||
      form.freeDeliveryThreshold <
        0
    ) {
      return "Money and tax values must be zero or greater.";
    }

    if (
      form.newPassword ||
      form.confirmPassword ||
      form.currentPassword
    ) {
      if (
        form.newPassword.length <
        8
      ) {
        return "New password must be at least 8 characters.";
      }

      if (
        form.newPassword !==
        form.confirmPassword
      ) {
        return "New password and confirmation do not match.";
      }
    }

    return "";
  };

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const validationError =
      validate();

    if (validationError) {
      setStatus(
        validationError
      );

      return;
    }

    const {
      currentPassword,
      newPassword,
      confirmPassword,
      ...persisted
    } = form;

    void currentPassword;
    void newPassword;
    void confirmPassword;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        persisted
      )
    );

    setStatus(
      "Settings saved."
    );

    setForm((previous) => ({
      ...previous,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const renderInput = (
    key: keyof SettingsForm,
    label: string,
    type = "text"
  ) => (
    <label className="block">
      <span className="mb-2 block text-sm text-white/60">
        {label}
      </span>
      <input
        type={type}
        value={
          form[key] as string | number
        }
        onChange={(event) =>
          updateField(
            key,
            type === "number"
              ? Number(
                  event.target.value
                )
              : event.target.value
          )
        }
        className={fieldClass}
      />
    </label>
  );

  const renderToggle = (
    key: keyof SettingsForm,
    label: string
  ) => (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
      <span className="text-sm text-white/75">
        {label}
      </span>
      <input
        type="checkbox"
        checked={
          Boolean(form[key])
        }
        onChange={(event) =>
          updateField(
            key,
            event.target.checked
          )
        }
        className="h-5 w-5 accent-[#D4AF37]"
      />
    </label>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Settings
        </h1>
        <p className="mt-2 text-white/50">
          Configure business, payments, delivery, notifications and profile settings.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className={sectionClass}>
          <h2 className="mb-4 text-xl font-semibold">
            Business Information
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {renderInput(
              "businessName",
              "Business Name"
            )}
            {renderInput(
              "businessEmail",
              "Business Email",
              "email"
            )}
            {renderInput(
              "businessPhone",
              "Business Phone"
            )}
            {renderInput(
              "businessAddress",
              "Business Address"
            )}
            {renderInput(
              "logo",
              "Logo URL"
            )}
            {renderInput(
              "currency",
              "Currency"
            )}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="mb-4 text-xl font-semibold">
            Social Links
          </h2>
          <div className="grid gap-4">
            {renderInput(
              "facebook",
              "Facebook"
            )}
            {renderInput(
              "instagram",
              "Instagram"
            )}
            {renderInput(
              "whatsapp",
              "WhatsApp"
            )}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="mb-4 text-xl font-semibold">
            Tax and Delivery
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {renderToggle(
              "taxEnabled",
              "Tax Enabled"
            )}
            {renderInput(
              "taxRate",
              "Tax Rate (%)",
              "number"
            )}
            {renderToggle(
              "deliveryEnabled",
              "Delivery Enabled"
            )}
            {renderInput(
              "deliveryBaseFee",
              "Delivery Base Fee",
              "number"
            )}
            {renderInput(
              "freeDeliveryThreshold",
              "Free Delivery Threshold",
              "number"
            )}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="mb-4 text-xl font-semibold">
            Notifications
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {renderToggle(
              "orderNotifications",
              "Order Notifications"
            )}
            {renderToggle(
              "lowStockNotifications",
              "Low Stock Notifications"
            )}
            {renderToggle(
              "telegramEnabled",
              "Telegram Enabled"
            )}
            {renderInput(
              "telegramChatId",
              "Telegram Chat ID"
            )}
            {renderToggle(
              "emailEnabled",
              "Email Enabled"
            )}
            {renderInput(
              "senderEmail",
              "Sender Email",
              "email"
            )}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="mb-4 text-xl font-semibold">
            Paystack
          </h2>
          <div className="grid gap-4">
            {renderToggle(
              "paystackEnabled",
              "Paystack Enabled"
            )}
            {renderInput(
              "paystackPublicKey",
              "Paystack Public Key"
            )}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="mb-4 text-xl font-semibold">
            Profile and Password
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {renderInput(
              "profileName",
              "Profile Name"
            )}
            {renderInput(
              "profileEmail",
              "Profile Email",
              "email"
            )}
            {renderInput(
              "currentPassword",
              "Current Password",
              "password"
            )}
            {renderInput(
              "newPassword",
              "New Password",
              "password"
            )}
            {renderInput(
              "confirmPassword",
              "Confirm Password",
              "password"
            )}
          </div>
        </section>
      </div>

      {status && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
          {status}
        </div>
      )}

      <button
        type="submit"
        className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black"
      >
        Save Settings
      </button>
    </form>
  );
};

export default Settings;
