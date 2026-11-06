const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/question");

// Question bank: 10 questions for each category and difficulty (120 total).
const questions = [
  // ==================== HTML — EASY ====================
  {
    question: "Which tag creates a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which tag displays an image?",
    options: ["<image>", "<picture>", "<img>", "<src>"],
    correctAnswer: 2,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which tag creates the largest heading?",
    options: ["<h6>", "<heading>", "<head>", "<h1>"],
    correctAnswer: 3,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which tag creates an unordered list?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    correctAnswer: 0,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which tag defines a paragraph?",
    options: ["<para>", "<p>", "<text>", "<paragraph>"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which element creates a line break?",
    options: ["<br>", "<hr>", "<lb>", "<break>"],
    correctAnswer: 0,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which tag defines a list item?",
    options: ["<ul>", "<ol>", "<li>", "<item>"],
    correctAnswer: 2,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which attribute specifies an image source?",
    options: ["href", "alt", "link", "src"],
    correctAnswer: 3,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which element contains page metadata?",
    options: ["<head>", "<body>", "<main>", "<footer>"],
    correctAnswer: 0,
    category: "HTML",
    difficulty: "Easy",
  },
  {
    question: "Which declaration identifies an HTML5 document?",
    options: ["<html5>", "<!DOCTYPE html>", "<DOCTYPE>", "<document>"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Easy",
  },

  // ==================== HTML — MEDIUM ====================
  {
    question: "What does alt text provide for an image?",
    options: ["Image styling", "Alternative text", "Image dimensions", "A caption automatically"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which element collects user input in a form?",
    options: ["<input>", "<data>", "<output>", "<value>"],
    correctAnswer: 0,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which attribute makes an input mandatory?",
    options: ["validate", "required", "mandatory", "needed"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which semantic element represents navigation?",
    options: ["<section>", "<aside>", "<nav>", "<main>"],
    correctAnswer: 2,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which input type is designed for email addresses?",
    options: ["text", "url", "number", "email"],
    correctAnswer: 3,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which attribute associates a label with an input by ID?",
    options: ["for", "name", "value", "formaction"],
    correctAnswer: 0,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which element is used for a table header cell?",
    options: ["<td>", "<th>", "<tr>", "<thead>"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which attribute opens a link in a new browsing context?",
    options: ["new", "target='_blank'", "open", "window"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which element groups related form controls with a caption?",
    options: ["<fieldset>", "<formgroup>", "<group>", "<section>"],
    correctAnswer: 0,
    category: "HTML",
    difficulty: "Medium",
  },
  {
    question: "Which element provides a selectable list of options?",
    options: ["<options>", "<select>", "<listbox>", "<choice>"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Medium",
  },

  // ==================== HTML — HARD ====================
  {
    question: "Which form attribute specifies the submission URL?",
    options: ["method", "action", "target", "name"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "Which attribute enables video playback controls?",
    options: ["controls", "play", "toolbar", "visible"],
    correctAnswer: 0,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "Which element embeds another webpage?",
    options: ["<embedpage>", "<frame>", "<iframe>", "<webpage>"],
    correctAnswer: 2,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "What does defer on a classic script do?",
    options: ["Stops script", "Runs before parsing", "Loads only on click", "Executes after parsing in document order"],
    correctAnswer: 3,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "Which attribute gives an input a regular-expression validation pattern?",
    options: ["pattern", "regex", "validate", "match"],
    correctAnswer: 0,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "What is the purpose of the <output> element?",
    options: ["Submit form", "Display calculation/result output", "Store hidden data", "Define options"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "Which attribute on <script> supports parallel fetching and executes when ready?",
    options: ["defer", "async", "moduleonly", "parallel"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "Which element is used to disclose supplementary details interactively?",
    options: ["<summary>", "<details>", "<dialogue>", "<aside>"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "Which attribute sets a media resource's poster image?",
    options: ["thumbnail", "cover", "poster", "preview"],
    correctAnswer: 2,
    category: "HTML",
    difficulty: "Hard",
  },
  {
    question: "Which attribute on an anchor indicates the download intent?",
    options: ["save", "download", "file", "attachment"],
    correctAnswer: 1,
    category: "HTML",
    difficulty: "Hard",
  },

  // ==================== CSS — EASY ====================

    // ==================== CSS — EASY ====================
  {
    question: "Which property changes text color?",
    options: ["font-style", "background", "color", "text-align"],
    correctAnswer: 2,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which property sets background color?",
    options: ["background-color", "color", "bgcolor", "background-style"],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which property makes text bold?",
    options: ["font-style", "font-weight", "text-decoration", "font-size"],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which property centers inline text?",
    options: ["align", "vertical-align", "justify-content", "text-align"],
    correctAnswer: 3,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which symbol selects a class?",
    options: ["#", ".", "*", "@"],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which symbol selects an element by ID?",
    options: [".", "#", "&", "!"],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which property changes font size?",
    options: ["text-size", "font", "font-size", "size"],
    correctAnswer: 2,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which property adds space outside an element border?",
    options: ["padding", "margin", "gap", "outline"],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which property rounds element corners?",
    options: ["border-radius", "corner", "round", "radius"],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "Easy",
  },
  {
    question: "Which value hides an element while removing its layout space?",
    options: ["visibility:hidden", "opacity:0", "display:none", "hidden:yes"],
    correctAnswer: 2,
    category: "CSS",
    difficulty: "Easy",
  },

  // ==================== CSS — MEDIUM ====================
  {
    question: "Which CSS layout system is one-dimensional?",
    options: ["Grid", "Flexbox", "Positioning", "Float"],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "Which property adds space inside the border?",
    options: ["margin", "gap", "padding", "outline"],
    correctAnswer: 2,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "Which pseudo-class applies on hover?",
    options: [":hover", ":active", ":focus", ":visited"],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "Which property controls stacking order?",
    options: ["display", "position", "order", "z-index"],
    correctAnswer: 3,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "Which declaration makes a flex container?",
    options: ["display:flex", "flex:display", "position:flex", "layout:flex"],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "Which property defines grid track columns?",
    options: ["grid-template-rows", "grid-template-columns", "grid-auto-flow", "column-gap"],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "What does position: fixed position relative to?",
    options: ["Parent element", "Normal flow", "Viewport", "Next sibling"],
    correctAnswer: 2,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "Which media feature commonly checks viewport width?",
    options: ["height", "resolution", "orientation", "width"],
    correctAnswer: 3,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "Which property controls space between flex items?",
    options: ["gap", "padding", "margin-inline", "spacing"],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "Medium",
  },
  {
    question: "Which pseudo-class selects the first child?",
    options: [":first", ":first-child", ":child-first", ":first-of"],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Medium",
  },

    // ==================== CSS — HARD ====================
  {
    question: "What does the CSS box-sizing property control?",
    options: [
      "Element positioning",
      "How width and height are calculated",
      "Font rendering",
      "Border color",
    ],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "Which selector has the highest specificity?",
    options: [
      ".container",
      "#header",
      "div",
      "*",
    ],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "What does the CSS function calc() allow?",
    options: [
      "Animation calculation",
      "Color conversion",
      "Mathematical calculations in CSS values",
      "Grid auto placement",
    ],
    correctAnswer: 2,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "Which property defines animation keyframes?",
    options: [
      "animation-name",
      "transition",
      "animation",
      "@keyframes",
    ],
    correctAnswer: 3,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "What does the :nth-child(2) selector target?",
    options: [
      "The second child element",
      "The second class",
      "The last child",
      "Every second parent",
    ],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "Which property can create a smooth change between CSS states?",
    options: [
      "transform",
      "transition",
      "animation-delay",
      "change",
    ],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "What does the !important declaration do?",
    options: [
      "Makes CSS invalid",
      "Increases font size",
      "Raises declaration priority",
      "Creates an animation",
    ],
    correctAnswer: 2,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "Which unit is relative to the root element's font size?",
    options: [
      "em",
      "px",
      "%",
      "rem",
    ],
    correctAnswer: 3,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "Which property controls whether an element can be resized by the user?",
    options: [
      "resize",
      "overflow",
      "transform",
      "scale",
    ],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "Hard",
  },
  {
    question: "What does the CSS isolation property help control?",
    options: [
      "Element width",
      "Stacking context creation",
      "Text alignment",
      "Grid sizing",
    ],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "Hard",
  },

  // ==================== JAVASCRIPT — EASY ====================
  {
    question: "Which keyword declares a block-scoped variable?",
    options: [
      "var",
      "let",
      "define",
      "int",
    ],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "Which operator checks strict equality?",
    options: [
      "=",
      "==",
      "===",
      "!=",
    ],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "Which method prints a message to the console?",
    options: [
      "print()",
      "log()",
      "console.print()",
      "console.log()",
    ],
    correctAnswer: 3,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "Which data type represents true or false?",
    options: [
      "Boolean",
      "String",
      "Number",
      "Object",
    ],
    correctAnswer: 0,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "Which symbol is used for a single-line comment?",
    options: [
      "#",
      "//",
      "<!--",
      "**",
    ],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "Which method adds an item to the end of an array?",
    options: [
      "pop()",
      "shift()",
      "push()",
      "unshift()",
    ],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "Which keyword declares a constant?",
    options: [
      "let",
      "var",
      "static",
      "const",
    ],
    correctAnswer: 3,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "What is the result of typeof 'Hello'?",
    options: [
      "'string'",
      "'text'",
      "'char'",
      "'object'",
    ],
    correctAnswer: 0,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "Which function converts a string to an integer?",
    options: [
      "NumberString()",
      "parseInt()",
      "toString()",
      "parseFloatString()",
    ],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "Easy",
  },
  {
    question: "Which array property returns its number of elements?",
    options: [
      "size",
      "count",
      "length",
      "items",
    ],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "Easy",
  },

    // ==================== JAVASCRIPT — MEDIUM ====================
  {
    question: "What does Array.map() return?",
    options: ["A new array", "The original array only", "A number", "A boolean"],
    correctAnswer: 0,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "Which method filters array elements based on a condition?",
    options: ["map()", "filter()", "reduce()", "findIndex()"],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "What is a closure in JavaScript?",
    options: ["A loop", "A class", "A function with access to its outer scope", "An array"],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "Which method converts JSON text into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.convert()", "JSON.object()", "JSON.parse()"],
    correctAnswer: 3,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "What does the spread operator look like?",
    options: ["...", "=>", "**", "&&"],
    correctAnswer: 0,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "Which keyword is used to handle errors?",
    options: ["if/else", "try/catch", "for/while", "switch/case"],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "What does Promise.all() do?",
    options: ["Runs promises one by one", "Stops all promises", "Waits for all promises to settle successfully", "Creates a promise"],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "Which method removes the last element from an array?",
    options: ["shift()", "unshift()", "push()", "pop()"],
    correctAnswer: 3,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "What does the === operator compare?",
    options: ["Value and type", "Only value", "Only type", "Object keys"],
    correctAnswer: 0,
    category: "JavaScript",
    difficulty: "Medium",
  },
  {
    question: "Which method selects an element by its ID?",
    options: ["querySelectorAll()", "getElementById()", "getElementsByClassName()", "getElementsByTagName()"],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "Medium",
  },

  // ==================== JAVASCRIPT — HARD ====================
  {
    question: "What is the output of typeof null?",
    options: ["null", "undefined", "object", "boolean"],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "What is the purpose of the event loop?",
    options: ["Create HTML", "Manage CSS", "Store variables", "Coordinate asynchronous callbacks"],
    correctAnswer: 3,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "What does Object.freeze() do?",
    options: ["Prevents modification of an object's properties", "Deletes an object", "Creates a copy", "Converts object to array"],
    correctAnswer: 0,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "What is the output of 0.1 + 0.2 === 0.3?",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "What does the bind() method return?",
    options: ["A number", "A promise", "A new function with a bound this value", "An object"],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "Which statement about async functions is correct?",
    options: ["They cannot return values", "They execute only synchronously", "They always return strings", "They always return a Promise"],
    correctAnswer: 3,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "What is the temporal dead zone?",
    options: ["The period before let or const declarations are initialized", "A JavaScript timer", "A browser event", "A memory leak"],
    correctAnswer: 0,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "Which method creates a shallow copy of an array?",
    options: ["splice()", "slice()", "pop()", "sort()"],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "What is prototypal inheritance?",
    options: ["Inheritance using HTML", "Inheritance using CSS", "Objects inheriting properties from other objects", "Inheritance using database tables"],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "Hard",
  },
  {
    question: "What does the optional chaining operator ?. do?",
    options: ["Creates a loop", "Declares a variable", "Checks strict equality", "Safely accesses nested properties"],
    correctAnswer: 3,
    category: "JavaScript",
    difficulty: "Hard",
  },

  // ==================== REACT — EASY ====================
  {
    question: "What is React primarily used for?",
    options: ["Building user interfaces", "Managing databases", "Creating operating systems", "Writing SQL queries"],
    correctAnswer: 0,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "What is a React component?",
    options: ["A database", "A reusable UI building block", "A CSS property", "A server"],
    correctAnswer: 1,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "Which syntax is used to describe UI in React?",
    options: ["SQL", "XML only", "JSX", "Markdown"],
    correctAnswer: 2,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "Which hook is used to manage state?",
    options: ["useEffect", "useRef", "useMemo", "useState"],
    correctAnswer: 3,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "How are props passed to a component?",
    options: ["As attributes", "Through CSS", "Using SQL", "Through HTML comments"],
    correctAnswer: 0,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "Which method is commonly used to render lists in React?",
    options: ["filter()", "map()", "reduce()", "join()"],
    correctAnswer: 1,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "What is the default export used for?",
    options: ["Deleting components", "Styling components", "Exporting a main value from a module", "Creating a state"],
    correctAnswer: 2,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "Which syntax represents a fragment?",
    options: ["<div/>", "<section/>", "<group/>", "<></>"],
    correctAnswer: 3,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "How do you handle a click event in JSX?",
    options: ["onClick", "onclick", "click", "on-click"],
    correctAnswer: 0,
    category: "React",
    difficulty: "Easy",
  },
  {
    question: "What is the purpose of a key when rendering a list?",
    options: ["Style elements", "Identify list items uniquely", "Create a component", "Store state"],
    correctAnswer: 1,
    category: "React",
    difficulty: "Easy",
  },

  // ==================== REACT — MEDIUM ====================
  {
    question: "What does useEffect commonly handle?",
    options: ["Component styling", "Creating JSX", "Side effects", "Declaring props"],
    correctAnswer: 2,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "What happens when state changes in a React component?",
    options: ["The app always reloads", "The component is deleted", "The browser closes", "React schedules a re-render"],
    correctAnswer: 3,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "How should state be updated when its new value depends on the previous value?",
    options: ["Use a functional state update", "Modify state directly", "Use document.querySelector()", "Use console.log()"],
    correctAnswer: 0,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "What is a controlled component?",
    options: ["A component controlled by CSS", "A form element whose value is controlled by React state", "A component without props", "A component rendered only once"],
    correctAnswer: 1,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "What is lifting state up?",
    options: ["Deleting state", "Moving state into CSS", "Moving shared state to a common parent", "Moving state into the DOM"],
    correctAnswer: 2,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "What does useRef return?",
    options: ["A string", "A component", "A promise", "A mutable ref object"],
    correctAnswer: 3,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "What is the purpose of React Context?",
    options: ["Share data across components without passing props through every level", "Create CSS animations", "Manage database queries", "Replace JSX"],
    correctAnswer: 0,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "What does the dependency array in useEffect control?",
    options: ["Component styling", "When the effect runs again", "The component's HTML", "The return value"],
    correctAnswer: 1,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "Why should React state not be mutated directly?",
    options: ["It changes CSS", "It deletes props", "React may not detect the update correctly", "It stops JavaScript"],
    correctAnswer: 2,
    category: "React",
    difficulty: "Medium",
  },
  {
    question: "What is the purpose of React Router?",
    options: ["Manage CSS", "Create components", "Store data", "Handle navigation between views"],
    correctAnswer: 3,
    category: "React",
    difficulty: "Medium",
  },

  // ==================== REACT — HARD ====================
  {
    question: "What is React.memo() used for?",
    options: ["Memoizing a component to avoid unnecessary re-renders", "Managing state", "Creating routes", "Handling forms"],
    correctAnswer: 0,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "What does useMemo() return?",
    options: ["A new component", "A memoized value", "A state setter", "A DOM element"],
    correctAnswer: 1,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "What is reconciliation in React?",
    options: ["Creating CSS", "Managing HTTP requests", "Comparing UI trees to determine updates", "Installing packages"],
    correctAnswer: 2,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "What is the purpose of an error boundary?",
    options: ["Handle every network request", "Manage CSS errors", "Replace all hooks", "Catch rendering errors in descendant components"],
    correctAnswer: 3,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "What does useCallback() memoize?",
    options: ["A function", "A component's HTML", "A database", "A CSS style"],
    correctAnswer: 0,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "Why are stable keys important in React lists?",
    options: ["They improve CSS", "They help React identify items across updates", "They create state", "They prevent JavaScript execution"],
    correctAnswer: 1,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "What is the purpose of lazy loading with React.lazy()?",
    options: ["Load CSS faster", "Create a state variable", "Load components when needed", "Delete unused components"],
    correctAnswer: 2,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "What does Suspense allow React to do?",
    options: ["Manage state", "Create event handlers", "Update CSS", "Show fallback UI while waiting for something"],
    correctAnswer: 3,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "What is hydration in React?",
    options: ["Attaching React behavior to server-rendered HTML", "Deleting HTML", "Updating CSS", "Creating a database"],
    correctAnswer: 0,
    category: "React",
    difficulty: "Hard",
  },
  {
    question: "What is a custom hook?",
    options: ["A CSS function", "A reusable function that uses React hooks", "A database method", "A JSX attribute"],
    correctAnswer: 1,
    category: "React",
    difficulty: "Hard",
  },
];

// ==================== DATABASE SEEDING ====================

const seedDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected!");

    // Delete existing questions before inserting the new question bank.
    await Question.deleteMany({});

    await Question.insertMany(questions);

    console.log(`${questions.length} questions inserted successfully!`);

    // Verify the number of questions in each category and difficulty.
    const verification = await Question.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
            difficulty: "$difficulty",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.category": 1,
          "_id.difficulty": 1,
        },
      },
    ]);

    console.log("\nQuestion count verification:");

    verification.forEach((item) => {
      console.log(
        `${item._id.category} - ${item._id.difficulty}: ${item.count}`
      );
    });
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("\nMongoDB disconnected.");
  }
};

seedDatabase();