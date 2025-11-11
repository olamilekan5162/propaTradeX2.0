import React from "react";

const Footer = () => {
  return (
    <div className="bg-background border-t border-solid border-border px-4 sm:px-6 lg:px-10 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm">
          {" "}
          © 2025 PropaTradeX. All rights reserved.{" "}
        </p>
        <div className="flex gap-4">
          <a className="text-muted-foreground hover:text-primary" href="#">
            FAQ
          </a>
          <a className="text-muted-foreground hover:text-primary" href="#">
            Contact
          </a>
          <a className="text-muted-foreground hover:text-primary" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
