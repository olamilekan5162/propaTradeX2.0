import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-solid border-gray-200 px-4 sm:px-6 lg:px-10 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-secondary-text text-sm">
          {" "}
          © 2025 PropaTradeX. All rights reserved.{" "}
        </p>
        <div className="flex gap-4">
          <a className="text-secondary-text hover:text-primary-color" href="#">
            FAQ
          </a>
          <a className="text-secondary-text hover:text-primary-color" href="#">
            Contact
          </a>
          <a className="text-secondary-text hover:text-primary-color" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
