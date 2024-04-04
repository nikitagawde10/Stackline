import React from "react";
import { StackLineLogo } from "../../assets/StackLineLogo";
import "./Header.css";
export const Header: React.FC = () => {
  return (
    <>
      <header className="main-header">
        <div className="logo-container">
          <StackLineLogo />
        </div>
      </header>
    </>
  );
};
