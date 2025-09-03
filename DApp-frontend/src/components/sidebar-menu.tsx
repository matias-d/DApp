import IconClose from "./icons/IconClose";
import IconMenu from "./icons/IconMenu";
import { useState } from "react";
import { cn } from "../lib/cn";
import { Link } from "wouter";
import useFormStaking from "../hooks/useFormStaking";

const links = [
  {
    id: 1,
    href: "/",
    label: "Home",
  },
  {
    id: 2,
    href: "/staking",
    label: "Staking",
  },
];

export default function SidebarMenu() {
  const { stakingFormatted, stellartFormatted } = useFormStaking();

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="z-10 block lg:hidden">
        {open ? <IconClose /> : <IconMenu />}
      </button>
      <aside
        className={cn(
          "block lg:hidden fixed top-0 h-full w-[75%] bg-zinc-950 border-l border-zinc-600/40 overflow-hidden transition-all duration-200 ease-in-out",
          open ? "right-0" : "-right-full"
        )}
      >
        <div className="pt-26 w-full  overflow-hidden flex justify-start flex-col gap-y-4 p-4">
          <nav className="flex flex-col gap-y-4 ">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={handleClose}
                className={(active) =>
                  active
                    ? "hover:text-gray-100 transition-colors text-gray-100 uppercase text-2xl font-bold"
                    : "text-gray-400 hover:text-gray-100 transition-colors uppercase text-2xl font-bold"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <hr className="border border-zinc-700/50 w-full" />
          <div className="flex flex-col items-center justify-between gap-6 lg:gap-x-12 mb-6">
            <div className="w-full">
              <span className="text-zinc-400 mb-1 block">In stake</span>
              <div className="flex items-center gap-x-2  bg-[radial-gradient(ellipse_200%_100%_at_top_right,#fee8a0,#f3d17a)] border border-yellow-100  w-full rounded-lg p-2">
                <img
                  src="/public/tokens/JamToken.png"
                  className="size-10 rounded-full ring-violet-500 "
                />
                <p className="text-yellow-700 font-medium">
                  {stakingFormatted} JAM
                </p>
              </div>
            </div>
            <div className="w-full">
              <span className="text-zinc-400 mb-1 block">Rewards earned</span>
              <div className="flex items-center gap-x-2 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#8e51ff,#d8bfff)] border border-violet-300  w-full rounded-lg p-2">
                <img
                  src="/public/tokens/StellartToken.png"
                  className="size-10 rounded-full ring-violet-600 "
                />
                <p className="text-violet-800 font-medium">
                  {stellartFormatted} STE
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
