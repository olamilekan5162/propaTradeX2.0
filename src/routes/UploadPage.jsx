import React, { useState } from "react";
import { Upload, Home, FileText, Video, Image, DollarSign } from "lucide-react";
import { toast } from "react-hot-toast";
import { uploadImageVideoFile } from "../utils/helper";
import { usePropertyUpload } from "../hooks/usePropertyUpload";

const UploadPage = () => {
  const { uploadProperty } = usePropertyUpload();
  const [listingType, setListingType] = useState("");
  const [formData, setFormData] = useState({
    propertyAddress: "",
    propertyType: "",
    description: "",
    price: "",
    monthlyRent: "",
    rentalPeriod: "",
    depositRequired: "",
    document: null,
    images: [],
    video: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    if (!e.target.files) return;
    const files =
      field === "images" ? Array.from(e.target.files) : e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const cids = await uploadImageVideoFile(
      e,
      formData.images[0],
      formData.video,
      formData.document
    );
    console.log(cids);

    await uploadProperty(listingType, formData, cids);

    toast.success("Property listing submitted successfully!");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[var(--secondary-bg)] px-4 py-10"
      style={{ color: "var(--primary-text)" }}
    >
      <div className="w-full max-w-3xl bg-[var(--primary-bg)] shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[var(--primary-color)] mb-2">
          Upload Property
        </h1>
        <p className="text-[var(--secondary-text)] mb-6">
          List your property for sale or rent on the IOTA blockchain.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Listing Type */}
          <div>
            <label className="block font-semibold mb-2">Listing Type *</label>
            <select
              name="listingType"
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              className="w-full border rounded-lg p-3 outline-none bg-[var(--secondary-bg)] focus:ring-2 focus:ring-[var(--primary-color)]"
              required
            >
              <option value="">Select Type</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">
                Property Address *
              </label>
              <input
                type="text"
                name="propertyAddress"
                placeholder="e.g. 123 Main Street, City"
                value={formData.propertyAddress}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Property Type *
              </label>
              <input
                type="text"
                name="propertyType"
                placeholder="e.g. Apartment, Duplex"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Description *</label>
            <textarea
              name="description"
              placeholder="Enter detailed description of your property"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <DollarSign size={16} /> Price *
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter property price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          {/* File Uploads */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <Image size={16} /> Property Images *
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, "images")}
                className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <Video size={16} /> Property Video (Optional)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, "video")}
                className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] cursor-pointer"
              />
            </div>
          </div>

          {/* Conditional Fields */}
          <div
            className={`transition-all duration-300 ${
              listingType === "sale"
                ? "opacity-100 max-h-[600px]"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <FileText size={16} /> Property Documents (Sale Only)
            </label>
            <input
              type="file"
              accept=".pdf,.png,.jpg"
              onChange={(e) => handleFileChange(e, "document")}
              className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] cursor-pointer"
            />
          </div>

          <div
            className={`transition-all duration-300 grid md:grid-cols-3 gap-6 ${
              listingType === "rent"
                ? "opacity-100 max-h-[600px]"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <div>
              <label className="block font-semibold mb-2">Monthly Rent *</label>
              <input
                type="number"
                name="monthlyRent"
                placeholder="e.g. 500"
                value={formData.monthlyRent}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Rental Period (months) *
              </label>
              <input
                type="number"
                name="rentalPeriod"
                placeholder="e.g. 12"
                value={formData.rentalPeriod}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Deposit Required *
              </label>
              <input
                type="number"
                name="depositRequired"
                placeholder="e.g. 1000"
                value={formData.depositRequired}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-[var(--secondary-bg)] focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-[var(--secondary-bg)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] transition-all shadow-md"
            >
              Submit Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
