import { MoreVertical, Paperclip, Search, Send, Smile } from "lucide-react";

const Chat = () => {
  return (
    <div className="bg-primary-bg font-display text-primary-text">
      <div className="relative flex h-screen w-full flex-col group/design-root overflow-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex flex-1 overflow-hidden">
            <div className="w-1/3 border-r border-[#eeeeee] flex flex-col bg-primary-bg">
              <div className="p-4 border-b border-[#eeeeee]">
                <label className="flex flex-col min-w-40 h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <div className="text-secondary-text flex border-none bg-secondary-bg items-center justify-center pl-4 rounded-l-lg border-r-0">
                      <Search />
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-primary-text focus:outline-0 focus:ring-0 border-none bg-secondary-bg focus:border-none h-full placeholder:text-secondary-text px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                      placeholder="Search conversations"
                      value=""
                    />
                  </div>
                </label>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="flex items-center gap-4 bg-secondary-bg px-4 min-h-[72px] py-3 justify-between border-l-4 border-primary-color">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
                        data-alt="User avatar of Sarah J."
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAfE-PCF2g7ZM5LQeAIzoUwiRs3qqqRg206q6j52ijEUho_wyaCOqk1KlytAy_2hriKTlzNBr1qnYspC5FavDghPOJRRfUV5D60qOD4s8w5dtMlC4jBIc2DHdpV0fjB3qmMpnxk5PvhPbXMOg9a6JmnxV1SvWBpNmKmISogF3gtJN5GPqZPfvDpJIrpz1OBJvOAE2RYlQxnm71GLZO84hOhkxrvCPOk9dd-Lz52qtRM4msUtIMUxhdcPB8Qs4rmIQJg87HJFH4keg")',
                        }}
                      ></div>
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-secondary-bg"></span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-primary-text text-base font-medium leading-normal line-clamp-1">
                        Sarah J.
                      </p>
                      <p className="text-secondary-text text-sm font-normal leading-normal line-clamp-2">
                        Sounds good, let's connect tomorrow.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <p className="text-secondary-text text-xs font-normal leading-normal">
                      2:45 PM
                    </p>
                    <span className="w-2 h-2 rounded-full bg-secondary-color"></span>
                  </div>
                </div>
                <div className="flex items-center gap-4 hover:bg-secondary-bg/50 px-4 min-h-[72px] py-3 justify-between border-l-4 border-transparent">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
                        data-alt="User avatar of Mark D."
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgwc1xqwJYUMdoM8954nvUyDSlZP8fJs8UM-09XpPbsZydiwY_v57JdXKfSvVbCU5WFadmpZRYtcbnbBLWt57I9wfq3HDbd8XAtLkouRAPSHrU8c6g6DoMpFlaaK2F1eXO3SPwd2y0hlP_mFEUTmjDutLnbQ2FELOdSZaDiRO_PV3e_h8nHDAne0QEnoHK7kUagWu42BPEHGNCKHSxOS0suDF_xwhhIPA9I5wLpayEvqg8kXOHR88R7mfjPTDRvQFiVmcW-EQQNA")',
                        }}
                      ></div>
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-400 border-2 border-primary-bg"></span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-primary-text text-base font-medium leading-normal line-clamp-1">
                        Mark D.
                      </p>
                      <p className="text-secondary-text text-sm font-normal leading-normal line-clamp-2">
                        I'm interested in the property on Elm St.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <p className="text-secondary-text text-xs font-normal leading-normal">
                      1:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/3 flex flex-col bg-secondary-bg">
              <div className="flex items-center justify-between p-4 border-b border-[#eeeeee]">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12"
                      data-alt="User avatar of Sarah J."
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsr-cPCg9zPE8AAseUDE0QnS7WMTc0P480hHDeqyS3HRfXYjnNmDjEp63zh4KRNBUoVxeZrjyiJokHHE1iM2YH6z5MbnioTEaPNTb6SEVWNsXPDhDctQ5AR1wyObbzKyKu0VIebG-alxcDNpp7mHs3Xis8I5Xv56w6OnwYb0q4EHl3IxArmZoY4vvJMdXX6FBAyC-nTJNvpv4tEll7esHCxUu7fCGlriJGj-RAwcvV6uX_CRt2zwIW-tnR2SGuGPRF5NhlVqBYzQ")',
                      }}
                    ></div>
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-secondary-bg"></span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-text">
                      Sarah J.
                    </h3>
                    <p className="text-sm text-secondary-text">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    className="text-primary-color font-medium text-sm hover:underline"
                    href="#"
                  >
                    View Property
                  </a>
                  <button className="p-2 rounded-full hover:bg-black/5">
                    <MoreVertical className="material-symbols-outlined text-secondary-text" />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-8 w-8"
                      data-alt="User avatar of Sarah J."
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_XXDFFPO9YAjnFg-Zy_gz6VS9umh27hD95x6gyCD6QmLT1st5TmcUzFl3HIQRXxjB_JjTiv_efpnwl__Uv1XNzUBdX2qfvdGQ__G3t4d9EUc9Sw8d8Uhua6Pf4HH9JJ1DJwFjkjKj3ulou8Bea8MEsM3cHPeswF2fN6KItv6O3K_rsIwQnNLZwqIHDGNl_E4gFmP1dPujy3Qyp5SqYR2ZtWsbRjgO5GJW_vIuRcvLh-t4kY1yL9oO6hlvzLlywYVd9NbCKxKgUA")',
                      }}
                    ></div>
                    <div>
                      <div className="bg-primary-bg rounded-lg rounded-tl-none p-3 max-w-md">
                        <p className="text-sm text-primary-text">
                          Hey! I saw your listing for the villa in Malibu. Looks
                          amazing. Is it still available?
                        </p>
                      </div>
                      <p className="text-xs text-secondary-text mt-1">
                        2:40 PM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-8 w-8"
                      data-alt="Your avatar"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzW79j3-NX4B9VAia4OrOgZSLYB_tNBtR19cQgfj4MvracJdhGiVfbBpYj6ALXgBQDxljFg_H6rm2g8JxlCe-vzy3ODMUTUW1qeb0uxDQeCVYogh2Ox3JcDiDDFPqflxVIv4-uUMaSC1ZpWL1GFC_Yq80-wo6BoWsqQbt-RXH0HM0-vFsLaCPlc6VLpmEi-I-qYrnoZ5evMgtDD2ChUbiOLDQoV0idUSStmrIJsxCgHfZAH1LSHxQkIB85DTjOqouT_vXO-RYdWA")',
                      }}
                    ></div>
                    <div>
                      <div className="bg-primary-color rounded-lg rounded-tr-none p-3 max-w-md">
                        <p className="text-sm text-white">
                          Hi Sarah, thanks for reaching out. Yes, it's still
                          available. Happy to answer any questions you have.
                        </p>
                      </div>
                      <p className="text-xs text-secondary-text mt-1 text-right">
                        2:42 PM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-8 w-8"
                      data-alt="User avatar of Sarah J."
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC051W2a78a9U18xlLP9BHARnN2V7tXnhPz8qYO_NmCK34xqE4v28JgW01o9YrMDdJTRdWBU-IPCw6ajt6MWzHMA7QozIlsjRtRTi99PNobiqZwV2DVvFABfxslwBowDCMjUcKYyWOf-05bUTUd0hShxOjnOARHQ7-oyxy2I633zb00JZNIEldxCU9cN410Jnipu29_eTkcKDqNV1CUflzV-9JUpaLagMAIN_mIKerdI_16USi_tjWCxTlQBROT0jimPU3mlEY3xg")',
                      }}
                    ></div>
                    <div>
                      <div className="bg-primary-bg rounded-lg rounded-tl-none p-3 max-w-md">
                        <p className="text-sm text-primary-text">
                          Great! I'd love to schedule a virtual tour if
                          possible. Would you be free sometime tomorrow
                          afternoon?
                        </p>
                      </div>
                      <p className="text-xs text-secondary-text mt-1">
                        2:43 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-[#eeeeee] bg-secondary-bg">
                <div className="flex items-center gap-4 bg-primary-bg rounded-lg px-4 py-2">
                  <input
                    className="flex-1 bg-transparent text-primary-text placeholder-secondary-text focus:outline-none"
                    placeholder="Type your message..."
                    type="text"
                  />
                  <button className="p-2 rounded-full hover:bg-black/5">
                    <Smile className=" text-secondary-text" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-black/5">
                    <Paperclip className=" text-secondary-text" />
                  </button>
                  <button className="bg-primary-color text-white rounded-full p-2">
                    <Send className="material-symbols-outlined" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Chat;
