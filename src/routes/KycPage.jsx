import { Cloud, CloudDownloadIcon, UploadCloud } from "lucide-react";
import { usePropertyhook } from "../hooks/usePropertyHook";
import toast from "react-hot-toast";
import { useState } from "react";

export default function KycPage() {
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
    console.log("Submitting...", userData);
    console.log("Submitting...");
    await registerUser(userData);
    console.log("submitted");
  };

  return (
    <div className="bg-primary-bg text-[#111318]">
      <div className="relative flex min-h-screen w-full flex-col font-display">
        <main className="flex w-full flex-1 justify-center py-10 px-4 sm:py-16">
          <div className="flex w-full max-w-2xl flex-col">
            <div className="mb-8 text-center">
              <h1 className="text-[#111318] text-4xl font-black leading-tight tracking-[-0.033em]">
                Complete Your KYC
              </h1>
              <p className="text-[#5f6b8c] text-base font-normal leading-normal mt-3">
                Verify your identity to securely buy, sell, and rent properties.
              </p>
            </div>

            <form className="w-full rounded-xl border border-[#dbdee6]  bg-white  p-6 sm:p-8 space-y-6">
              <label className="flex flex-col">
                <p className="text-[#111318] text-base font-medium leading-normal pb-2">
                  Full Name
                </p>
                <input
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdee6] bg-white h-14 placeholder:text-[#5f6b8c] p-[15px] text-base font-normal leading-normal"
                  placeholder="Enter your full name"
                />
              </label>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="flex flex-col">
                  <p className="text-[#111318] text-base font-medium leading-normal pb-2">
                    Phone Number
                  </p>
                  <input
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdee6] bg-white h-14 placeholder:text-[#5f6b8c] p-[15px] text-base font-normal leading-normal"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-[#111318] text-base font-medium leading-normal pb-2">
                    Email Address
                  </p>
                  <input
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdee6] bg-white h-14 placeholder:text-[#5f6b8c] p-[15px] text-base font-normal leading-normal"
                    placeholder="you@example.com"
                    type="email"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="flex flex-col">
                  <p className="text-[#111318] text-base font-medium leading-normal pb-2">
                    Government ID Type
                  </p>
                  <select
                    name="idType"
                    value={userData.idType}
                    onChange={handleChange}
                    className="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdee6] bg-white h-14 bg-no-repeat bg-[center_right_1rem] placeholder:text-[#5f6b8c] p-[15px] text-base font-normal leading-normal"
                  >
                    <option value="">Select ID Type</option>
                    <option value="id_card">ID Card</option>
                    <option value="voters_card">Voters Card</option>
                    <option value="drivers_license">Driver's License</option>
                    <option value="passport">Passport ID</option>
                  </select>
                </label>

                <label className="flex flex-col">
                  <p className="text-[#111318] text-base font-medium leading-normal pb-2">
                    Government ID Number
                  </p>
                  <input
                    name="idNumber"
                    value={userData.idNumber}
                    onChange={handleChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdee6] bg-white h-14 placeholder:text-[#5f6b8c] p-[15px] text-base font-normal leading-normal"
                    placeholder="Enter your ID number"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-4 bg-primary-color text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <span className="truncate">Submit for Verification</span>
              </button>

              <p className="text-center text-xs text-[#5f6b8c]/60">
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
        </main>
      </div>
    </div>
  );
}
