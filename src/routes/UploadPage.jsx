import React, { useState } from "react";
import { Upload, Home, FileText, Video, Image, DollarSign, MapPin, Building2, X, Check } from "lucide-react";
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
    const files = field === "images" ? Array.from(e.target.files) : e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: files }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!listingType) {
      toast.error("Please select a listing type");
      return;
    }
    
    if (formData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      toast.loading("Uploading property...");
      
      const cids = await uploadImageVideoFile(
        e,
        formData.images[0],
        formData.video,
        formData.document
      );

      await uploadProperty(listingType, formData, cids);
      
      toast.dismiss();
      toast.success("Property listing submitted successfully!");
      
      // Reset form
      setFormData({
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
      setListingType("");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to upload property. Please try again.");
      console.error(error);
    }
  };

  const handleReset = () => {
    setFormData({
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
    setListingType("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4">
            <Upload size={32} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground text-transparent bg-clip-text">
            List Your Property
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Upload your property to the blockchain marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Listing Type Selection */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <label className="block font-semibold mb-4 text-lg">Listing Type *</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setListingType("sale")}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  listingType === "sale"
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_var(--color-primary)]"
                    : "border-border hover:border-primary/50 bg-background"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <Home size={32} className={listingType === "sale" ? "text-primary" : "text-muted-foreground"} />
                  <span className="font-semibold">For Sale</span>
                  {listingType === "sale" && <Check size={20} className="text-primary" />}
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setListingType("rent")}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  listingType === "rent"
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_var(--color-primary)]"
                    : "border-border hover:border-primary/50 bg-background"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <Building2 size={32} className={listingType === "rent" ? "text-primary" : "text-muted-foreground"} />
                  <span className="font-semibold">For Rent</span>
                  {listingType === "rent" && <Check size={20} className="text-primary" />}
                </div>
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg space-y-6">
            <h3 className="text-xl font-bold">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  Property Address *
                </label>
                <input
                  type="text"
                  name="propertyAddress"
                  placeholder="e.g. 123 Main Street, New York"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  required
                  className="w-full border border-border rounded-lg p-3 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 flex items-center gap-2">
                  <Building2 size={16} className="text-primary" />
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full border border-border rounded-lg p-3 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Condo">Condo</option>
                  <option value="Studio">Studio</option>
                  <option value="Land">Land</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                placeholder="Describe your property in detail (location, amenities, features, etc.)"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-border rounded-lg p-3 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg space-y-6">
            <h3 className="text-xl font-bold">Pricing</h3>
            
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-primary" />
                {listingType === "rent" ? "Purchase Price *" : "Property Price *"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  placeholder="Enter amount in IOTA"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-border rounded-lg p-3 pr-16 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">IOTA</span>
              </div>
            </div>

            {/* Rental-specific fields */}
            {listingType === "rent" && (
              <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-border">
                <div>
                  <label className="block font-semibold mb-2">Monthly Rent *</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="monthlyRent"
                      placeholder="500"
                      value={formData.monthlyRent}
                      onChange={handleChange}
                      required={listingType === "rent"}
                      className="w-full border border-border rounded-lg p-3 pr-16 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">IOTA</span>
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2">Rental Period *</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="rentalPeriod"
                      placeholder="12"
                      value={formData.rentalPeriod}
                      onChange={handleChange}
                      required={listingType === "rent"}
                      className="w-full border border-border rounded-lg p-3 pr-20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">months</span>
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2">Deposit Required *</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="depositRequired"
                      placeholder="1000"
                      value={formData.depositRequired}
                      onChange={handleChange}
                      required={listingType === "rent"}
                      className="w-full border border-border rounded-lg p-3 pr-16 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">IOTA</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Media Uploads */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg space-y-6">
            <h3 className="text-xl font-bold">Media & Documents</h3>
            
            {/* Images */}
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <Image size={16} className="text-primary" />
                Property Images * <span className="text-xs text-muted-foreground font-normal">(Max 10 images)</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all cursor-pointer bg-background/50">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "images")}
                  className="hidden"
                  id="images-upload"
                />
                <label htmlFor="images-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
                </label>
              </div>
              
              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video */}
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <Video size={16} className="text-primary" />
                Property Video <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all cursor-pointer bg-background/50">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "video")}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Video className="mx-auto mb-2 text-muted-foreground" size={32} />
                  <p className="text-sm text-muted-foreground">Click to upload video</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, MOV up to 100MB</p>
                </label>
              </div>
              {formData.video && (
                <p className="text-sm text-green-400 mt-2 flex items-center gap-2">
                  <Check size={16} /> {formData.video.name}
                </p>
              )}
            </div>

            {/* Documents (Sale only) */}
            {listingType === "sale" && (
              <div>
                <label className="block font-semibold mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-primary" />
                  Property Documents <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all cursor-pointer bg-background/50">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg"
                    onChange={(e) => handleFileChange(e, "document")}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload" className="cursor-pointer">
                    <FileText className="mx-auto mb-2 text-muted-foreground" size={32} />
                    <p className="text-sm text-muted-foreground">Click to upload documents</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 10MB</p>
                  </label>
                </div>
                {formData.document && (
                  <p className="text-sm text-green-400 mt-2 flex items-center gap-2">
                    <Check size={16} /> {formData.document.name}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition-all duration-300 font-medium"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_var(--color-primary)]"
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