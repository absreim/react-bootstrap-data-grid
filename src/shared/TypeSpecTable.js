import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var TypeSpecTable = function (_a) {
  var caption = _a.caption,
    rows = _a.rows;
  return _jsxs("table", {
    className: "table",
    children: [
      caption && _jsx("caption", { children: caption }),
      _jsx("thead", {
        children: _jsxs("tr", {
          children: [
            _jsx("th", { children: "Property name" }),
            _jsx("th", { children: "Type definition" }),
            _jsx("th", { children: "Required/Optional" }),
            _jsx("th", { children: "Description" }),
          ],
        }),
      }),
      _jsx("tbody", {
        children: rows.map(function (_a, index) {
          var propertyName = _a.propertyName,
            typeDefinition = _a.typeDefinition,
            isRequired = _a.isRequired,
            description = _a.description;
          return _jsxs(
            "tr",
            {
              children: [
                _jsx("td", { children: propertyName }),
                _jsx("td", { children: typeDefinition }),
                _jsx("td", { children: isRequired ? "Required" : "Optional" }),
                _jsx("td", { children: description }),
              ],
            },
            index,
          );
        }),
      }),
    ],
  });
};
export default TypeSpecTable;
