import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white py-2 w-full mt-auto">
      <div className="w-full flex flex-row items-center justify-center gap-2 text-sm">
        <p>
          Built by{" "}
          <Link
            href="https://github.com/ArnobDas57"
            className="text-blue-300 hover:underline"
            target="_blank"
          >
            Arnob Das
          </Link>{" "}
          © {new Date().getFullYear()}
        </p>

        <div className="ml-4 flex flex-row gap-2">
          <Link
            href="https://github.com/ArnobDas57"
            target="_blank"
            className="hover:text-blue-300"
          >
            <FaGithub size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/arnobdas/"
            target="_blank"
            className="hover:text-blue-300"
          >
            <FaLinkedin size={20} />
          </Link>
          <Link
            href="https://arnobdas.com/"
            target="_blank"
            className="hover:text-blue-300"
            aria-label="Personal Website"
          >
            <FaGlobe size={20} />
          </Link>
          <Link
            href="https://www.instagram.com/arnodas/"
            target="_blank"
            className="hover:text-blue-300"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
