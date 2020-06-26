import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import * as labels from '../labels';
import * as styles from './styles/error__layout';

export default function ErrorLayout(props) {
  if (props.errors.length === 0) return null;

  return (
    <Accordion className="m-2" allowZeroExpanded style={styles.accordionStyles}>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <b style={{ color: props.headerColor || 'black' }}>
              {props.errors.length === 1
                ? labels.ERROR_OCCURED
                : labels.ERRORS_OCCURED}
            </b>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          {props.errors.map(error => (
            <React.Fragment key={error}>
              <span style={{ color: props.color || 'red' }}>{error}</span>
              <br />
            </React.Fragment>
          ))}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}
