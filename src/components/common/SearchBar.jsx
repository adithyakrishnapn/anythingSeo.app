import { Search }
from "lucide-react";

function SearchBar({
  search,
  setSearch,
  searchPlaceholder,
}) {

  return (

    <div className="
      relative w-full
    ">

      <Search
        className="
          absolute left-3 top-1/2
          -translate-y-1/2

          h-4 w-4
          text-muted-foreground
        "
      />

      <input
        type="text"
        placeholder={searchPlaceholder}
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          rounded-lg
          border border-border
          bg-background

          py-2 pl-10 pr-4

          text-sm

          focus:outline-none
          focus:ring-2
          focus:ring-primary
        "
      />

    </div>

  );

}

export default SearchBar;