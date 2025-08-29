import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                    <Checkbox
                      checked={filters[keyItem]?.includes(option.id) || false}
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="text-blue-600 dark:text-blue-400 focus:ring-2 focus:ring-blue-500"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="bg-gray-200 dark:bg-gray-700" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;