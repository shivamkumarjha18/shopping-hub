import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const types = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

function CommonForm({
  formcontrols = [], // ✅ default empty array
  formData = {}, // ✅ default empty object
  setFormData = () => {}, // ✅ default no-op function
  onSubmit = (e) => e.preventDefault(), // ✅ prevent crash if not passed
  buttonText,
}) {
  function renderInputByComponentType(getcontrolitem) {
    let element = null;
    const value = formData[getcontrolitem.name] || "";

    switch (getcontrolitem.componentType) {
      case types.INPUT:
        element = (
          <Input
            value={value}
            name={getcontrolitem.name}
            placeholder={getcontrolitem.placeholder}
            id={getcontrolitem.id}
            type={getcontrolitem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrolitem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case types.SELECT:
        element = (
          <Select
            onValueChange={(val) =>
              setFormData({ ...formData, [getcontrolitem.name]: val })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrolitem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(getcontrolitem.options) &&
              getcontrolitem.options.length > 0
                ? getcontrolitem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.value}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case types.TEXTAREA:
        element = (
          <textarea
            value={value}
            name={getcontrolitem.name}
            placeholder={getcontrolitem.placeholder}
            id={getcontrolitem.id}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrolitem.name]: event.target.value,
              })
            }
            className="border rounded p-2 w-full"
          />
        );
        break;

      default:
        element = (
          <Input
            value={value}
            name={getcontrolitem.name}
            placeholder={getcontrolitem.placeholder}
            id={getcontrolitem.id}
            type={getcontrolitem.type || "text"}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrolitem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {Array.isArray(formcontrols) && formcontrols.length > 0 ? (
          formcontrols.map((controlitem) => (
            <div className="grid w-full gap-1.5" key={controlitem.name}>
              <Label className="text-sm font-medium">{controlitem.label}</Label>
              {renderInputByComponentType(controlitem)}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">⚠️ No form controls provided</p>
        )}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
