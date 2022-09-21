import { createGlobalStyle } from 'styled-components';
import Colors from './colors';
import Fonts from './fonts';

const vogue = '/fonts/vogue.ttf';

const Global = createGlobalStyle`
  @font-face {
    font-family: 'Vogue';
    src: url(${vogue}) format('truetype');
  }

   body {
    margin: 0;
    background: ${Colors.background};
    font-family: ${Fonts.Family.text};
    font-weight: ${Fonts.Weight.regular};
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: ${Colors.text};
    font-family: ${Fonts.Family.head};
    font-weight: ${Fonts.Weight.regular};
  }
  
  h1 {
    font-size: ${Fonts.Size.largeXXX};
  }
  
  h2 {
    font-size: ${Fonts.Size.largeXX};
  }
  
  h3 {
    font-size: ${Fonts.Size.largeX};
  }
  
  h4 {
    font-size: ${Fonts.Size.large};
  }
  
  h5 {
    font-size: ${Fonts.Size.regular};
  }
  
  h6 {
    font-size: ${Fonts.Size.small};
  }
  
  p, i, a {
    margin: 0;
    font-size: ${Fonts.Size.large};
    font-weight: ${Fonts.Weight.regular};
    color: ${Colors.text};
  }
  
  i {
    font-style: normal;
  }
  
  a {
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  
  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  
  a {
    background-color: transparent;
  }
  
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
  }
  
  b,
  strong {
    font-weight: bolder;
  }
  
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  
  small {
    font-size: 80%;
  }
  
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  
  sub {
    bottom: -0.25em;
  }
  
  sup {
    top: -0.5em;
  }
  
  img {
    border-style: none;
  }
  
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; 
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  
  button,
  input { 
    overflow: visible;
  }
  
  button {
    border: 0;
    background: 0;
    border-radius: 2px green;
  }
  
  button,
  select {
    text-transform: none;
  }
  
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  
  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  
  progress {
    vertical-align: baseline;
  }
  
  textarea {
    overflow: auto;
  }
  
  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }
  
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  
  details {
    display: block;
  }
  
  summary {
    display: list-item;
  }
  
  template {
    display: none;
  }
  
  [hidden] {
    display: none;
  }
`;

export default Global;
