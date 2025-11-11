import { IoSearch } from "react-icons/io5";

type SearchProps = {
  placeholder?: string;
  defaultValue?: string;
  className?: string; // For custom width/styling
  inputClassName?: string; // For input-specific styling
};

export default function Search({
  placeholder = "Search recipes...",
  defaultValue = "",
  className = "",
  inputClassName = "",
}: SearchProps) {
  return (
    <form action="/recipe" method="get" className={className}>
      <label className="relative block">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
          <IoSearch size={18} aria-hidden="true" />
        </span>
        <input
          type="text"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`w-full rounded-full bg-[#F5F2F2] border border-gray-100 pl-10 pr-4 py-2 text-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#FFDB63]/60 focus:border-transparent ${inputClassName}`}
        />
      </label>
    </form>
  );
}
