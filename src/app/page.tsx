import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-8">
      <nav className="flex items-center justify-between">
        <div className="text-xl font-bold">App Name</div>
        <div>
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "ghost", className: "mr-4" })}
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className={buttonVariants({ variant: "default" })}
          >
            Get Started Today
          </Link>
        </div>
      </nav>
    </div>
  );
}
