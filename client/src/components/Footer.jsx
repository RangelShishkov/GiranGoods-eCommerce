import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-center">
      <div className="flex justify-center gap-2 mx-auto p-4">
        <div className="text-2xl">
          <FaGithub />
        </div>
        <div>
          <a href="https://github.com/RangelShishkov">
            <p className="font-bold hover:underline">github.com/RangelShishkov</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
