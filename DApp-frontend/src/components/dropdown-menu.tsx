import useFormStaking from "../hooks/useFormStaking";
import { cn } from "../lib/cn";
import { IconWallet } from "./icons/IconWallet";
import { useState } from "react";

export default function DropdownMenu() {
  const { stakingFormatted, stellartFormatted } = useFormStaking();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden lg:block">
      <button
        onClick={() => setOpen(!open)}
        className="hover:bg-zinc-800 transition-colors p-1.5 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IconWallet />
      </button>

      <div
        className={cn(
          "bg-zinc-700 border-2 rounded-lg border-zinc-800 w-48  absolute -bottom-22 right-0 transition-opacity  ease-in-out",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex items-center gap-x-2 border-b border-zinc-800/50 pb-2 p-2">
          <span className="text-zinc-400 text-xs">In stake :</span>
          <div className="flex items-center gap-x-1">
            <img
              src="/tokens/JamToken.png"
              alt="icon JamToken"
              className="size-6"
            />
            <p className="text-sm text-yellow-300 truncate">
              {stakingFormatted} JAM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2 border-b border-zinc-800/50 pb-2 p-2">
          <span className="text-zinc-400 text-xs">Rewards :</span>
          <div className="flex items-center gap-x-1">
            <img
              src="/tokens/StellartToken.png"
              alt="icon JamToken"
              className="size-6"
            />
            <p className="text-sm text-violet-300 truncate">
              {stellartFormatted} STE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
