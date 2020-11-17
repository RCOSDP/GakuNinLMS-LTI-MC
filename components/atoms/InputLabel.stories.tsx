export default { title: "atoms/InputLabel" };

import InputLabel from "@material-ui/core/InputLabel";
import RequiredDot from "atoms/RequiredDot";
import useInputLabelStyles from "styles/inputLabel";

export const Default = () => {
  const inputLabelClasses = useInputLabelStyles();
  return (
    <InputLabel classes={inputLabelClasses}>
      Label
      <RequiredDot />
    </InputLabel>
  );
};

export const Required = () => {
  const inputLabelClasses = useInputLabelStyles();
  return (
    <InputLabel classes={inputLabelClasses} required>
      Label
      <RequiredDot />
    </InputLabel>
  );
};
