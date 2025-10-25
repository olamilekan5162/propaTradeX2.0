import { Copy, Edit, Pen } from "lucide-react";

const Profile = () => {
  return (
    <div className="bg-primary-bg font-display text-primary-text">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-secondary-bg ">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <p className="text-primary-text text-4xl font-black leading-tight tracking-[-0.033em]">
                  Wallet &amp; Profile
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col gap-8">
                  <div className="p-6 rounded-xl bg-primary-bg  shadow-md">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                          <p className="text-primary-text text-lg font-bold leading-tight">
                            Connected
                          </p>
                        </div>
                        <p className="text-secondary-text text-sm font-normal leading-normal">
                          Iota User
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <p className="text-secondary-text text-xs font-medium">
                        Wallet Address
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-primary-text text-sm font-mono truncate">
                          iota1qrc...z9q5
                        </p>
                        <button className="flex items-center justify-center rounded-md h-7 px-2 bg-secondary-bg text-secondary-text text-xs font-medium hover:bg-gray-200">
                          <Copy className="ext-base mr-1" size={10} />
                        </button>
                      </div>
                    </div>
                    <button className="mt-6 w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-secondary-color text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-orange-700">
                      <span className="truncate">Disconnect</span>
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-2 flex flex-col gap-8">
                  <div className="bg-primary-bg p-6 rounded-xl shadow-md">
                    <div className="flex flex-col sm:flex-row w-full gap-6 @[520px]:justify-between @[520px]:items-center">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                            data-alt="User profile picture"
                            style={{
                              backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFvV77Qw5xI5BjJ_pUobHD449Fe_LvOoTzywPdhWiFq-7jNzAnz8Gcst1v644ocp_PcXGkCXbY3AZblrqlF4GzCG67SV9wOc9i5KEeR-pYaD79ovCt5Y4sqGz7G2T4wObHCN-CGMzr6F5VwazRFGhOTGDFMROKCf3dNzofgrou-SbUjJaKVVFSBFh1Y3X5xqhHY2HMENfvV93Hw9cWfzZalXM2WBHhblIDRHqNa6GVNiI5Zu5TubAjbTdXGxcb39PoRmrqr7u-Aw")',
                            }}
                          ></div>
                          <button className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-color text-white hover:bg-blue-700">
                            <Pen size={15} />
                          </button>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <p className="text-primary-text text-[22px] font-bold leading-tight tracking-[-0.015em]">
                            SatoshiN
                          </p>
                          <p className="text-secondary-text text-base font-normal leading-normal">
                            satoshi.n@email.com
                          </p>
                          <p className="text-secondary-text text-base font-normal leading-normal mt-1">
                            Web3 enthusiast and real estate investor.
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full sm:w-auto gap-3">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-secondary-bg text-primary-text text-sm font-bold leading-normal tracking-[0.015em] flex-1 hover:bg-gray-200">
                          <span className="truncate">Edit</span>
                        </button>
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-color text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 hover:bg-blue-700">
                          <span className="truncate">Save Changes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <h2 className="text-primary-text text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
                  Transaction History
                </h2>
                <div className="bg-primary-bg rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-secondary-text ">
                      <thead className="text-xs text-secondary-text uppercase bg-secondary-bg">
                        <tr>
                          <th className="px-6 py-3" scope="col">
                            Date
                          </th>
                          <th className="px-6 py-3" scope="col">
                            Transaction Type
                          </th>
                          <th className="px-6 py-3" scope="col">
                            Property
                          </th>
                          <th className="px-6 py-3" scope="col">
                            Amount (IOTA)
                          </th>
                          <th className="px-6 py-3" scope="col">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-primary-bg  border-b border-gray-200 hover:bg-secondary-bg ">
                          <td className="px-6 py-4">2023-10-26</td>
                          <td className="px-6 py-4">Purchase</td>
                          <td className="px-6 py-4 font-medium text-primary-text ">
                            Ocean View Villa
                          </td>
                          <td className="px-6 py-4">1,500,000</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-primary-bg border-b border-gray-200 0 hover:bg-secondary-bg">
                          <td className="px-6 py-4">2023-10-24</td>
                          <td className="px-6 py-4">Sale</td>
                          <td className="px-6 py-4 font-medium text-primary-text ">
                            Downtown Loft
                          </td>
                          <td className="px-6 py-4">950,000</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-primary-bg border-b border-gray-200 over:bg-secondary-bg ">
                          <td className="px-6 py-4">2023-10-22</td>
                          <td className="px-6 py-4">Bid</td>
                          <td className="px-6 py-4 font-medium text-primary-text ">
                            Riverside Apartment
                          </td>
                          <td className="px-6 py-4">1,200,000</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-primary-bg  hover:bg-secondary-bg">
                          <td className="px-6 py-4">2023-10-20</td>
                          <td className="px-6 py-4">Deposit</td>
                          <td className="px-6 py-4 font-medium text-primary-text ">
                            -
                          </td>
                          <td className="px-6 py-4">5,000,000</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Failed
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <nav
                    aria-label="Table navigation"
                    className="flex items-center justify-between p-4 border-t border-gray-200"
                  >
                    <span className="text-sm font-normal text-secondary-text">
                      Showing{" "}
                      <span className="font-semibold text-primary-text">
                        1-4
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-primary-text">
                        100
                      </span>
                    </span>
                    <ul className="inline-flex items-center -space-x-px">
                      <li>
                        <a
                          className="px-3 py-2 ml-0 leading-tight text-secondary-text bg-primary-bg border border-gray-300 rounded-l-lg hover:bg-secondary-bg hover:text-primary-text"
                          href="#"
                        >
                          Previous
                        </a>
                      </li>
                      <li>
                        <a
                          className="px-3 py-2 leading-tight text-secondary-text bg-primary-bg border border-gray-300 hover:bg-secondary-bg hover:text-primary-text"
                          href="#"
                        >
                          1
                        </a>
                      </li>
                      <li>
                        <a
                          className="px-3 py-2 leading-tight text-primary-color bg-blue-100 border border-primary-color hover:bg-blue-200 hover:text-blue-800"
                          href="#"
                        >
                          2
                        </a>
                      </li>
                      <li>
                        <a
                          className="px-3 py-2 leading-tight text-secondary-text bg-primary-bg border border-gray-300 hover:bg-secondary-bg hover:text-primary-text"
                          href="#"
                        >
                          3
                        </a>
                      </li>
                      <li>
                        <a
                          className="px-3 py-2 leading-tight text-secondary-text bg-primary-bg border border-gray-300 rounded-r-lg hover:bg-secondary-bg hover:text-primary-text"
                          href="#"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
