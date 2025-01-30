import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { CodeIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href="/">
          <CodeIcon />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
