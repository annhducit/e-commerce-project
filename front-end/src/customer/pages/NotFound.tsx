import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="p-6 mx-auto w-[460px] text-center translate-y-2/4">
            <div className="flex flex-col gap-y-6">
                <h1 className="m-0 font-bold text-transparent text-9xl bg-clip-text bg-gradient-to-r from-[#8bb5f5] to-[#64a1ff]">
                    Oops!
                </h1>
                <p className="font-sans text-lg font-bold opacity-80">
                    404 PAGE NOT FOUND
                </p>
                <span className="font-semibold opacity-60">
                    The page you are looking for might has been removed has it's
                    name changed or is temporarily unavailable.
                </span>
                <div>
                    <Link
                        to="/"
                        className="px-4 py-2 text-sm font-bold text-white bg-[#64a1ff] rounded-full"
                    >
                        GO TO HOMEPAGE
                    </Link>
                </div>
            </div>
        </div>
    );
}
