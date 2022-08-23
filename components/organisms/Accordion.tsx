import type { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  type AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

type Props = {
  summary: ReactNode;
  details: ReactNode;
};

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.75rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  minHeight: 64,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    marginLeft: theme.spacing(1),
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 4, 2),
}));

export default function Accordion(props: Props) {
  return (
    <MuiAccordion disableGutters defaultExpanded>
      <AccordionSummary>{props.summary}</AccordionSummary>
      <AccordionDetails>{props.details}</AccordionDetails>
    </MuiAccordion>
  );
}
