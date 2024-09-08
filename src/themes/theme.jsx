/* eslint-disable react-refresh/only-export-components */
import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./additions/cards/card";
import { buttonStyles } from "./reusables/button";
import { badgeStyles } from "./reusables/badge";
import { inputStyles } from "./reusables/input";
import { breakpoints } from "./foundations/breakpoints";
import { linkStyles } from "./reusables/link";
import { progressStyles } from "./reusables/progress";
import { sliderStyles } from "./reusables/slider";
import { textareaStyles } from "./reusables/textarea";
import { switchStyles } from "./reusables/switch";

import { globalStyles } from "./styles";
export default extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  CardComponent, // card component
  {
    fonts: {
      heading: "Georgia, serif",
      body: "Arial, sans-serif",
    },
  }
);
