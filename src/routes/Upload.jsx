import { UploadCloud } from "lucide-react";

const Upload = () => {
  return (
    <div className="bg-background-light text-gray-800 ">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <main className="flex-1 p-4 sm:p-6 md:p-10">
                <div className="flex flex-wrap justify-between gap-3 mb-8">
                  <div className="flex min-w-72 flex-col gap-3">
                    <p className="text-gray-900  text-4xl font-black leading-tight tracking-[-0.033em]">
                      Upload Property Documents
                    </p>
                    <p className="text-gray-600  text-base font-normal leading-normal">
                      Securely upload your property ownership documents to the
                      IOTA blockchain.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-4 mb-8">
                  <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-gray-300  px-6 py-14 hover:border-primary transition-colors">
                    <UploadCloud className="text-gray-400 " size={50} />

                    <div classNameName="flex max-w-[480px] flex-col items-center gap-2">
                      <p className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                        Drag and drop your property documents here
                      </p>
                      <p className="text-gray-700  text-sm font-normal leading-normal max-w-[480px] text-center">
                        or
                      </p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200  text-gray-800  text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 ">
                      <span className="truncate">Browse Files</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col">
                      <p className="text-gray-800  text-base font-medium leading-normal pb-2">
                        Property Title
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800  focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300  bg-white  h-14 placeholder:text-gray-500  p-[15px] text-base font-normal leading-normal"
                        placeholder="Enter the title of your property"
                        value=""
                      />
                    </label>
                    <label className="flex flex-col">
                      <p className="text-gray-800  text-base font-medium leading-normal pb-2">
                        Property Location
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800  focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300  bg-white  h-14 placeholder:text-gray-500  p-[15px] text-base font-normal leading-normal"
                        placeholder="e.g., 123 Main Street, Anytown"
                        value=""
                      />
                    </label>
                  </div>
                  <label className="flex flex-col">
                    <p className="text-gray-800  text-base font-medium leading-normal pb-2">
                      Property Description
                    </p>
                    <textarea
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800  focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300  bg-white  min-h-36 placeholder:text-gray-500  p-[15px] text-base font-normal leading-normal"
                      placeholder="Enter a detailed description of your property"
                    ></textarea>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col">
                      <p className="text-gray-800  text-base font-medium leading-normal pb-2">
                        Number of Bedrooms
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800  focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300  bg-white  h-14 placeholder:text-gray-500  p-[15px] text-base font-normal leading-normal"
                        placeholder="e.g., 4"
                        type="number"
                        value=""
                      />
                    </label>
                    <div>
                      <p className="text-gray-800  text-base font-medium leading-normal pb-2">
                        Thumbnail Image
                      </p>
                      <div className="flex items-center justify-center w-full">
                        <label
                          className="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300  border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                          for="thumbnail-upload"
                        >
                          <div className="flex items-center justify-center pt-5 pb-6 px-4">
                            <span className="material-symbols-outlined text-gray-500  mr-2">
                              image
                            </span>
                            <p className="text-sm text-gray-500 ">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                          </div>
                          <input
                            className="hidden"
                            id="thumbnail-upload"
                            type="file"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-800  text-base font-medium leading-normal pb-2">
                        Inspection Video
                      </p>
                      <div className="flex items-center justify-center w-full">
                        <label
                          className="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300  border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                          for="video-upload"
                        >
                          <div className="flex items-center justify-center pt-5 pb-6 px-4">
                            <span className="material-symbols-outlined text-gray-500  mr-2">
                              videocam
                            </span>
                            <p className="text-sm text-gray-500 ">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                            </p>
                          </div>
                          <input
                            className="hidden"
                            id="video-upload"
                            type="file"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-800  text-base font-medium leading-normal pb-2">
                        Receipt/Proof of Purchase
                      </p>
                      <div className="flex items-center justify-center w-full">
                        <label
                          className="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300  border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                          for="receipt-upload"
                        >
                          <div className="flex items-center justify-center pt-5 pb-6 px-4">
                            <span className="material-symbols-outlined text-gray-500  mr-2">
                              receipt_long
                            </span>
                            <p className="text-sm text-gray-500 ">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                            </p>
                          </div>
                          <input
                            className="hidden"
                            id="receipt-upload"
                            type="file"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 pt-8">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200  text-gray-800  text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 ">
                    <span className="truncate">Cancel</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-color text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                    <span className="truncate">Submit Property</span>
                  </button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
