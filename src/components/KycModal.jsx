import { X } from "lucide-react";
import { usePropertyhook } from "../hooks/usePropertyHook";
import { useState } from "react";

export default function KycModal({ closeModal }) {
  const [userData, setUserData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    idType: "",
    idNumber: "",
  });

  const { registerUser } = usePropertyhook();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await registerUser(userData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg max-w-2xl w-full p-6 sm:p-8 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={24} />
        </button>
        <div className="mb-8 text-center">
          <h1 className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em]">
            Complete Your KYC
          </h1>
          <p className="text-muted-foreground text-base font-normal leading-normal mt-3">
            Verify your identity to securely buy, sell, and rent properties.
          </p>
        </div>

        <form className="w-full space-y-6">
          <label className="flex flex-col">
            <p className="text-foreground text-base font-medium leading-normal pb-2">
              Full Name
            </p>
            <input
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring border border-input bg-background h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal"
              placeholder="Enter your full name"
            />
          </label>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label className="flex flex-col">
              <p className="text-foreground text-base font-medium leading-normal pb-2">
                Phone Number
              </p>
              <input
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring border border-input bg-background h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal"
                placeholder="+1 (555) 000-0000"
                type="tel"
              />
            </label>

            <label className="flex flex-col">
              <p className="text-foreground text-base font-medium leading-normal pb-2">
                Email Address
              </p>
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring border border-input bg-background h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal"
                placeholder="you@example.com"
                type="email"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label className="flex flex-col">
              <p className="text-foreground text-base font-medium leading-normal pb-2">
                Government ID Type
              </p>
              <select
                name="idType"
                value={userData.idType}
                onChange={handleChange}
                className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring border border-input bg-background h-14 bg-no-repeat bg-[center_right_1rem] placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal"
              >
                <option value="">Select ID Type</option>
                <option value="id_card">ID Card</option>
                <option value="voters_card">Voters Card</option>
                <option value="drivers_license">Driver's License</option>
                <option value="passport">Passport ID</option>
              </select>
            </label>

            <label className="flex flex-col">
              <p className="text-foreground text-base font-medium leading-normal pb-2">
                Government ID Number
              </p>
              <input
                name="idNumber"
                value={userData.idNumber}
                onChange={handleChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring border border-input bg-background h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your ID number"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-4 bg-primary text-primary-foreground text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <span className="truncate">Submit for Verification</span>
          </button>

          <p className="text-center text-xs text-muted-foreground/60">
            Your data is encrypted and stored securely. Read our{" "}
            <a
              className="font-medium text-primary hover:underline"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
