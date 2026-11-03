import type { Module, User, Progress, Achievement, StreakDay } from "@/types"

// ─── Mock User ──────────────────────────────────────────────────────────────
export const mockUser: User = {
  id: "user-1",
  name: "Nikhil Singh",
  email: "nikhil@example.com",
  avatar: undefined,
  joinedAt: "2026-01-15",
  plan: "free",
  xp: 1240,
  streak: 7,
  learningGoal: "Master JavaScript fundamentals and build real-world projects",
}

// ─── Mock Roadmap ───────────────────────────────────────────────────────────
export const mockModules: Module[] = [
  {
    id: "mod-1",
    title: "JavaScript Foundations",
    description: "Variables, data types, operators, and basic control flow.",
    status: "completed",
    order: 1,
    estimatedHours: 4,
    lessons: [
      {
        id: "les-1-1",
        moduleId: "mod-1",
        title: "Variables & Data Types",
        estimatedMinutes: 20,
        status: "completed",
        order: 1,
        content: {
          objective: "Understand how JavaScript stores and categorizes data.",
          tags: ["variables", "let", "const", "var", "types"],
          explanation: `## Variables in JavaScript

Variables are containers for storing data values. JavaScript has three ways to declare variables:

- **\`var\`** — function-scoped, hoisted (older style, avoid)
- **\`let\`** — block-scoped, reassignable
- **\`const\`** — block-scoped, not reassignable

### Primitive Data Types

| Type | Example |
|------|---------|
| String | \`"Hello"\` |
| Number | \`42\`, \`3.14\` |
| Boolean | \`true\`, \`false\` |
| Undefined | \`undefined\` |
| Null | \`null\` |
| Symbol | \`Symbol("id")\` |
| BigInt | \`9007199254740991n\` |

Use \`typeof\` to check what type a value is.`,
          codeExample: `// Declaring variables
const name = "Alice";       // string
let age = 25;               // number
let isLoggedIn = false;     // boolean
let score = null;           // null (intentional empty)
let data;                   // undefined (no value yet)

// typeof operator
console.log(typeof name);       // "string"
console.log(typeof age);        // "number"
console.log(typeof isLoggedIn); // "boolean"
console.log(typeof data);       // "undefined"

// const prevents reassignment
const MAX_SIZE = 100;
// MAX_SIZE = 200; ← TypeError!`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Declare Your Own Variables",
          instructions:
            "Declare three variables: your name (const), your age (let), and whether you are a student (const). Then log each one to the console.",
          hint: "Use const for values that won't change and let for values that might.",
          expectedAnswer: "const",
          type: "code",
        },
      },
      {
        id: "les-1-2",
        moduleId: "mod-1",
        title: "Operators & Expressions",
        estimatedMinutes: 15,
        status: "completed",
        order: 2,
        content: {
          objective: "Use arithmetic, comparison, and logical operators.",
          tags: ["operators", "expressions", "comparison", "logical"],
          explanation: `## Operators in JavaScript

Operators let you perform operations on values.

### Arithmetic Operators
\`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulus), \`**\` (exponentiation)

### Comparison Operators
- \`==\` loose equality (converts types)
- \`===\` strict equality (no type conversion) ← always prefer this
- \`!=\`, \`!==\`, \`<\`, \`>\`, \`<=\`, \`>=\`

### Logical Operators
- \`&&\` AND — true if both are true
- \`||\` OR — true if at least one is true
- \`!\` NOT — inverts the boolean`,
          codeExample: `// Arithmetic
let x = 10;
let y = 3;
console.log(x + y);   // 13
console.log(x % y);   // 1 (remainder)
console.log(x ** y);  // 1000

// Comparison
console.log(5 == "5");   // true (loose)
console.log(5 === "5");  // false (strict) ← use this

// Logical
let hasAccount = true;
let isVerified = false;
console.log(hasAccount && isVerified); // false
console.log(hasAccount || isVerified); // true
console.log(!hasAccount);              // false`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Operator Practice",
          instructions:
            "Write an expression that checks if a number is both greater than 10 AND less than 100. Assign it to a variable called `isInRange`.",
          hint: "Combine two comparison operators with the && logical operator.",
          expectedAnswer: "&&",
          type: "code",
        },
      },
      {
        id: "les-1-3",
        moduleId: "mod-1",
        title: "Control Flow: if / else",
        estimatedMinutes: 20,
        status: "completed",
        order: 3,
        content: {
          objective: "Direct program execution using conditions.",
          tags: ["if", "else", "ternary", "switch"],
          explanation: `## Control Flow

Programs need to make decisions. JavaScript gives you several tools.

### if / else if / else
Executes a block of code only when a condition is \`true\`.

### Ternary Operator
A compact one-liner for simple conditionals:
\`\`\`
condition ? valueIfTrue : valueIfFalse
\`\`\`

### switch
Best for checking multiple specific values of the same variable.`,
          codeExample: `const score = 75;

// if / else if / else
if (score >= 90) {
  console.log("A");
} else if (score >= 75) {
  console.log("B");  // ← this runs
} else {
  console.log("C");
}

// Ternary
const result = score >= 60 ? "Pass" : "Fail";
console.log(result); // "Pass"

// switch
const day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of the week!");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  default:
    console.log("Midweek grind");
}`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Grade Calculator",
          instructions:
            "Write a function `getGrade(score)` that returns 'A' for 90+, 'B' for 75-89, 'C' for 60-74, and 'F' below 60.",
          hint: "Use if / else if / else statements and check conditions from highest to lowest.",
          expectedAnswer: "if",
          type: "code",
        },
      },
      {
        id: "les-1-4",
        moduleId: "mod-1",
        title: "Loops: for, while, for...of",
        estimatedMinutes: 25,
        status: "completed",
        order: 4,
        content: {
          objective: "Repeat actions efficiently using loops.",
          tags: ["for", "while", "for...of", "iteration"],
          explanation: `## Loops

Loops let you repeat code without writing it multiple times.

### for loop
Best when you know how many times to iterate.

### while loop
Best when you don't know the count but have a stop condition.

### for...of loop
Cleanly iterates over arrays and other iterables.

### break & continue
- \`break\` — exits the loop entirely
- \`continue\` — skips to the next iteration`,
          codeExample: `// for loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// while loop
let count = 0;
while (count < 3) {
  console.log("count:", count);
  count++;
}

// for...of (arrays)
const fruits = ["apple", "banana", "mango"];
for (const fruit of fruits) {
  console.log(fruit);
}

// break early
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0 1 2 3 4
}`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Sum with a Loop",
          instructions:
            "Write a function `sumArray(arr)` that uses a for loop to return the sum of all numbers in an array.",
          hint: "Initialize a sum variable to 0 before the loop, then add each element inside.",
          expectedAnswer: "sum",
          type: "code",
        },
      },
    ],
  },
  {
    id: "mod-2",
    title: "Functions & Scope",
    description: "Function declarations, arrow functions, closures, and scope.",
    status: "active",
    order: 2,
    estimatedHours: 5,
    lessons: [
      {
        id: "les-2-1",
        moduleId: "mod-2",
        title: "Function Declarations vs Expressions",
        estimatedMinutes: 25,
        status: "completed",
        order: 1,
        content: {
          objective: "Understand the two main ways to define functions.",
          tags: ["function", "declaration", "expression", "hoisting"],
          explanation: `## Functions

Functions are reusable blocks of code. JavaScript has multiple ways to create them.

### Function Declaration
Hoisted — you can call it before it appears in the file.

### Function Expression
Stored in a variable. NOT hoisted.

### Parameters & Return Values
Functions can accept input (parameters) and return output.

### Default Parameters
Set fallback values so parameters become optional.`,
          codeExample: `// Function Declaration (hoisted)
greet("Alice"); // works even before the definition!

function greet(name) {
  return "Hello, " + name + "!";
}

// Function Expression (not hoisted)
const double = function (n) {
  return n * 2;
};

// Default Parameters
function createUser(name, role = "student") {
  return { name, role };
}
console.log(createUser("Bob"));          // { name: 'Bob', role: 'student' }
console.log(createUser("Alice", "admin")); // { name: 'Alice', role: 'admin' }`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Write a Function",
          instructions:
            "Write a function declaration called `multiply` that takes two numbers and returns their product. Then write the same as a function expression.",
          hint: "Function declarations start with the `function` keyword. Expressions assign a function to a variable.",
          expectedAnswer: "return",
          type: "code",
        },
      },
      {
        id: "les-2-2",
        moduleId: "mod-2",
        title: "Arrow Functions",
        estimatedMinutes: 20,
        status: "active",
        order: 2,
        content: {
          objective: "Write concise functions using arrow syntax and understand `this` binding.",
          tags: ["arrow function", "=>", "this", "implicit return"],
          explanation: `## Arrow Functions

Arrow functions are a shorter way to write function expressions, introduced in ES6.

### Syntax
\`(params) => expression\` — implicit return (single expression)
\`(params) => { ... return value; }\` — explicit return (multiple statements)

### Key Difference: \`this\`
Arrow functions do NOT have their own \`this\`. They inherit it from the surrounding scope — which makes them ideal as callbacks inside classes and objects.

### When NOT to use arrow functions
- Object methods where you need \`this\`
- Constructor functions`,
          codeExample: `// Traditional function
const square = function (n) {
  return n * n;
};

// Arrow function — same thing
const squareArrow = (n) => n * n;

// Multi-line arrow function
const processUser = (user) => {
  const greeting = "Hello, " + user.name;
  return greeting.toUpperCase();
};

// Arrow functions in array methods (very common!)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Convert to Arrow Functions",
          instructions:
            "Rewrite the following using arrow function syntax:\n```\nfunction add(a, b) { return a + b; }\nfunction square(n) { return n * n; }\n```",
          hint: "For single-expression functions, you can omit the curly braces and `return` keyword for implicit return.",
          expectedAnswer: "=>",
          type: "code",
        },
      },
      {
        id: "les-2-3",
        moduleId: "mod-2",
        title: "Scope & Closures",
        estimatedMinutes: 30,
        status: "locked",
        order: 3,
        content: {
          objective: "Understand lexical scope and how closures work.",
          tags: ["scope", "closure", "lexical", "hoisting"],
          explanation: `## Scope & Closures

Scope determines where variables are accessible in your code.

### Types of Scope
- **Global scope** — accessible everywhere
- **Function scope** — only inside the function
- **Block scope** — inside \`{}\` (for \`let\` and \`const\`)

### Closures
A closure is when a function "remembers" variables from its outer scope even after that outer function has finished running.

Closures are powerful for data encapsulation and factory functions.`,
          codeExample: `// Scope example
let global = "I'm global";

function outer() {
  let outerVar = "I'm in outer";

  function inner() {
    let innerVar = "I'm in inner";
    console.log(global);   // ✓ accessible
    console.log(outerVar); // ✓ accessible
    console.log(innerVar); // ✓ accessible
  }
  inner();
  // console.log(innerVar); ← ReferenceError!
}

// Closure example: counter factory
function makeCounter() {
  let count = 0;            // private to makeCounter

  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
console.log(counter.value()); // 1`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Build a Closure",
          instructions:
            "Create a function `makeMultiplier(factor)` that returns a new function. The returned function should take a number and multiply it by `factor`.",
          hint: "The inner function should close over the `factor` variable from the outer function.",
          expectedAnswer: "return",
          type: "code",
        },
      },
      {
        id: "les-2-4",
        moduleId: "mod-2",
        title: "Higher-Order Functions",
        estimatedMinutes: 30,
        status: "locked",
        order: 4,
        content: {
          objective: "Use map, filter, reduce and write functions that take/return functions.",
          tags: ["map", "filter", "reduce", "higher-order", "callback"],
          explanation: `## Higher-Order Functions

A higher-order function (HOF) either takes a function as an argument or returns a function.

### Array HOFs you'll use daily:
- **\`map\`** — transforms each element, returns new array (same length)
- **\`filter\`** — keeps elements where callback returns \`true\`, returns new array
- **\`reduce\`** — accumulates array into a single value
- **\`forEach\`** — iterates, returns nothing (use for side effects)

These replace most \`for\` loops in modern JS.`,
          codeExample: `const students = [
  { name: "Alice", grade: 88 },
  { name: "Bob", grade: 62 },
  { name: "Carol", grade: 95 },
  { name: "Dave", grade: 74 },
];

// map — extract names
const names = students.map((s) => s.name);
// ["Alice", "Bob", "Carol", "Dave"]

// filter — passing students only
const passing = students.filter((s) => s.grade >= 70);
// [Alice(88), Carol(95), Dave(74)]

// reduce — calculate average grade
const avg = students.reduce((acc, s) => acc + s.grade, 0) / students.length;
console.log(avg); // 79.75

// chaining
const topNames = students
  .filter((s) => s.grade >= 80)
  .map((s) => s.name.toUpperCase());
// ["ALICE", "CAROL"]`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Chain HOFs",
          instructions:
            "Given an array of product objects with `name` and `price`, use `filter` and `map` to get the names of all products priced under $50.",
          hint: "First `filter` for price < 50, then `map` to extract just the name.",
          expectedAnswer: "filter",
          type: "code",
        },
      },
    ],
  },
  {
    id: "mod-3",
    title: "Arrays & Objects",
    description: "Deep dive into JS data structures, destructuring, spread, and methods.",
    status: "locked",
    order: 3,
    estimatedHours: 6,
    lessons: [
      {
        id: "les-3-1",
        moduleId: "mod-3",
        title: "Array Methods",
        estimatedMinutes: 25,
        status: "locked",
        order: 1,
        content: {
          objective: "Master the built-in array methods.",
          tags: ["array", "push", "pop", "splice", "slice", "find"],
          explanation: `## Array Methods\n\nArrays in JavaScript come with powerful built-in methods.`,
          codeExample: `const arr = [1, 2, 3, 4, 5];\nconsole.log(arr.find(n => n > 3)); // 4\nconsole.log(arr.includes(3));      // true`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Array Manipulation",
          instructions: "Use array methods to find the first even number in an array.",
          hint: "Use the `find` method with a callback that checks if a number is even.",
          expectedAnswer: "find",
          type: "code",
        },
      },
      {
        id: "les-3-2",
        moduleId: "mod-3",
        title: "Objects & Prototypes",
        estimatedMinutes: 30,
        status: "locked",
        order: 2,
        content: {
          objective: "Create and work with objects and understand the prototype chain.",
          tags: ["object", "prototype", "keys", "values", "entries"],
          explanation: `## Objects\n\nObjects store key-value pairs and form the backbone of JavaScript.`,
          codeExample: `const user = { name: "Alice", age: 25 };\nconst { name, age } = user;       // destructuring\nconst keys = Object.keys(user);    // ["name", "age"]`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Object Destructuring",
          instructions: "Destructure the `name` and `email` from a user object in a single line.",
          hint: "Use curly braces on the left side: `const { name, email } = user`",
          expectedAnswer: "destructuring",
          type: "code",
        },
      },
      {
        id: "les-3-3",
        moduleId: "mod-3",
        title: "Spread & Rest Operators",
        estimatedMinutes: 20,
        status: "locked",
        order: 3,
        content: {
          objective: "Use spread and rest to work with arrays and objects flexibly.",
          tags: ["spread", "rest", "...", "clone"],
          explanation: `## Spread & Rest\n\nThe \`...\` operator serves two purposes depending on context.`,
          codeExample: `const a = [1, 2, 3];\nconst b = [...a, 4, 5];          // [1,2,3,4,5]\nconst merged = { ...user, role: "admin" };`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Merge Objects",
          instructions: "Use the spread operator to merge two objects into one.",
          hint: "Use `{ ...obj1, ...obj2 }` syntax.",
          expectedAnswer: "...",
          type: "code",
        },
      },
      {
        id: "les-3-4",
        moduleId: "mod-3",
        title: "Destructuring Patterns",
        estimatedMinutes: 25,
        status: "locked",
        order: 4,
        content: {
          objective: "Use array and object destructuring in real-world patterns.",
          tags: ["destructuring", "alias", "nested", "default"],
          explanation: `## Destructuring\n\nDestructuring lets you extract values from arrays and objects concisely.`,
          codeExample: `const [first, , third] = [1, 2, 3]; // skip index 1\nconst { name: fullName = "Anonymous" } = {};`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Nested Destructuring",
          instructions: "Destructure the `city` from a nested address object: `{ user: { address: { city } } }`",
          hint: "You can nest destructuring patterns: `const { user: { address: { city } } } = data`",
          expectedAnswer: "address",
          type: "code",
        },
      },
    ],
  },
  {
    id: "mod-4",
    title: "Async JavaScript",
    description: "Promises, async/await, and working with APIs.",
    status: "locked",
    order: 4,
    estimatedHours: 6,
    lessons: [
      {
        id: "les-4-1",
        moduleId: "mod-4",
        title: "Callbacks & the Event Loop",
        estimatedMinutes: 25,
        status: "locked",
        order: 1,
        content: {
          objective: "Understand asynchronous execution and the event loop.",
          tags: ["callback", "event loop", "asynchronous", "setTimeout"],
          explanation: `## The Event Loop\n\nJavaScript is single-threaded but handles async work through the event loop.`,
          codeExample: `console.log("1");\nsetTimeout(() => console.log("2"), 0);\nconsole.log("3");\n// Output: 1, 3, 2`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Predict the Output",
          instructions: "Write what you expect to be logged when this code runs and explain why.",
          hint: "setTimeout always runs after synchronous code, even with a delay of 0ms.",
          expectedAnswer: "event loop",
          type: "text",
        },
      },
      {
        id: "les-4-2",
        moduleId: "mod-4",
        title: "Promises",
        estimatedMinutes: 30,
        status: "locked",
        order: 2,
        content: {
          objective: "Create and chain Promises to handle async work.",
          tags: ["Promise", "resolve", "reject", ".then", ".catch"],
          explanation: `## Promises\n\nA Promise represents a value that may be available now, later, or never.`,
          codeExample: `const fetchData = () =>\n  new Promise((resolve, reject) => {\n    setTimeout(() => resolve({ id: 1 }), 1000);\n  });\n\nfetchData().then(data => console.log(data));`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Create a Promise",
          instructions: "Write a Promise that resolves with 'Success' after 500ms and rejects if a flag is false.",
          hint: "Use `new Promise((resolve, reject) => { setTimeout(...) })`",
          expectedAnswer: "resolve",
          type: "code",
        },
      },
      {
        id: "les-4-3",
        moduleId: "mod-4",
        title: "async / await",
        estimatedMinutes: 30,
        status: "locked",
        order: 3,
        content: {
          objective: "Write cleaner async code with async/await syntax.",
          tags: ["async", "await", "try/catch", "async function"],
          explanation: `## async / await\n\nasync/await is syntactic sugar over Promises that makes async code look synchronous.`,
          codeExample: `async function loadUser(id) {\n  try {\n    const res = await fetch(\`/users/\${id}\`);\n    const user = await res.json();\n    return user;\n  } catch (err) {\n    console.error("Failed:", err);\n  }\n}`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Convert .then() to async/await",
          instructions: "Rewrite a Promise chain using async/await and proper try/catch error handling.",
          hint: "Use `async` before the function and `await` before each Promise.",
          expectedAnswer: "await",
          type: "code",
        },
      },
      {
        id: "les-4-4",
        moduleId: "mod-4",
        title: "Fetch API & Axios",
        estimatedMinutes: 35,
        status: "locked",
        order: 4,
        content: {
          objective: "Make HTTP requests from JavaScript using fetch and Axios.",
          tags: ["fetch", "axios", "REST", "HTTP", "GET", "POST"],
          explanation: `## Fetching Data\n\nModern JavaScript apps communicate with servers using HTTP requests.`,
          codeExample: `// fetch\nconst res = await fetch("https://api.example.com/users");\nconst users = await res.json();\n\n// axios\nimport axios from "axios";\nconst { data } = await axios.get("/users");`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Build a Data Fetcher",
          instructions: "Write an async function that fetches from a URL, handles errors, and returns the JSON data.",
          hint: "Check `res.ok` when using fetch, or use axios which throws on non-2xx responses.",
          expectedAnswer: "async",
          type: "code",
        },
      },
    ],
  },
  {
    id: "mod-5",
    title: "DOM & Browser APIs",
    description: "Manipulate the DOM, handle events, and use Web APIs.",
    status: "locked",
    order: 5,
    estimatedHours: 5,
    lessons: [
      {
        id: "les-5-1",
        moduleId: "mod-5",
        title: "DOM Selection & Manipulation",
        estimatedMinutes: 25,
        status: "locked",
        order: 1,
        content: {
          objective: "Select and modify DOM elements programmatically.",
          tags: ["DOM", "querySelector", "getElementById", "innerHTML"],
          explanation: `## DOM Manipulation\n\nThe DOM (Document Object Model) is a tree of objects representing the HTML page.`,
          codeExample: `const btn = document.querySelector("#myButton");\nconst title = document.getElementById("title");\ntitle.textContent = "Hello!";\nbtn.style.backgroundColor = "blue";`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Change the DOM",
          instructions: "Select an element by ID and change its text content.",
          hint: "Use `document.getElementById()` and set `.textContent`.",
          expectedAnswer: "textContent",
          type: "code",
        },
      },
      {
        id: "les-5-2",
        moduleId: "mod-5",
        title: "Event Listeners",
        estimatedMinutes: 25,
        status: "locked",
        order: 2,
        content: {
          objective: "Respond to user interactions with event listeners.",
          tags: ["addEventListener", "click", "submit", "event", "bubbling"],
          explanation: `## Events\n\nEvents let you run code when users interact with your page.`,
          codeExample: `const btn = document.querySelector("button");\nbtn.addEventListener("click", (event) => {\n  console.log("Clicked!", event.target);\n});`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Add a Click Handler",
          instructions: "Add an event listener to a button that alerts the user's name when clicked.",
          hint: "Use `element.addEventListener('click', () => { ... })`",
          expectedAnswer: "addEventListener",
          type: "code",
        },
      },
      {
        id: "les-5-3",
        moduleId: "mod-5",
        title: "Local Storage",
        estimatedMinutes: 20,
        status: "locked",
        order: 3,
        content: {
          objective: "Persist data in the browser using localStorage.",
          tags: ["localStorage", "sessionStorage", "JSON", "persist"],
          explanation: `## Local Storage\n\nlocalStorage lets you save data in the browser that persists across page reloads.`,
          codeExample: `// Save\nlocalStorage.setItem("user", JSON.stringify({ name: "Alice" }));\n// Read\nconst user = JSON.parse(localStorage.getItem("user"));\n// Remove\nlocalStorage.removeItem("user");`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Save User Preferences",
          instructions: "Write functions to save and load a theme preference ('dark'/'light') from localStorage.",
          hint: "Use `JSON.stringify()` when saving and `JSON.parse()` when reading.",
          expectedAnswer: "setItem",
          type: "code",
        },
      },
      {
        id: "les-5-4",
        moduleId: "mod-5",
        title: "Building a Mini Project",
        estimatedMinutes: 45,
        status: "locked",
        order: 4,
        content: {
          objective: "Apply all DOM concepts to build a working to-do app.",
          tags: ["project", "DOM", "events", "localStorage", "todo"],
          explanation: `## Mini Project: Todo App\n\nPut it all together: DOM selection, event listeners, array methods, and localStorage.`,
          codeExample: `let todos = JSON.parse(localStorage.getItem("todos")) || [];\n\nfunction addTodo(text) {\n  todos.push({ id: Date.now(), text, done: false });\n  localStorage.setItem("todos", JSON.stringify(todos));\n  render();\n}`,
          codeLanguage: "javascript",
        },
        exercise: {
          title: "Complete the Todo App",
          instructions: "Add a `toggleTodo(id)` function that flips the `done` property and re-renders.",
          hint: "Use `find` or `map` to locate the todo, flip `.done`, save to localStorage, and call `render()`.",
          expectedAnswer: "toggle",
          type: "code",
        },
      },
    ],
  },
]

// ─── Mock Progress ───────────────────────────────────────────────────────────
export const mockProgress: Progress = {
  overallPercentage: 34,
  totalLessonsCompleted: 7,
  totalLessons: 20,
  streakDays: 7,
  timeSpentMinutes: 285,
  moduleProgress: [
    { moduleId: "mod-1", moduleTitle: "JavaScript Foundations", completedLessons: 4, totalLessons: 4, percentage: 100 },
    { moduleId: "mod-2", moduleTitle: "Functions & Scope", completedLessons: 1, totalLessons: 4, percentage: 25 },
    { moduleId: "mod-3", moduleTitle: "Arrays & Objects", completedLessons: 0, totalLessons: 4, percentage: 0 },
    { moduleId: "mod-4", moduleTitle: "Async JavaScript", completedLessons: 0, totalLessons: 4, percentage: 0 },
    { moduleId: "mod-5", moduleTitle: "DOM & Browser APIs", completedLessons: 0, totalLessons: 4, percentage: 0 },
  ],
  weakAreas: [
    { topic: "Closures", score: 42 },
    { topic: "Prototypes", score: 35 },
    { topic: "Async/Await", score: 20 },
    { topic: "Event Loop", score: 55 },
  ],
  lastActivity: "2026-04-30",
}

// ─── Mock Achievements ────────────────────────────────────────────────────────
export const mockAchievements: Achievement[] = [
  { id: "ach-1", name: "First Step", description: "Complete your first lesson", icon: "🎯", unlockedAt: "2026-01-16" },
  { id: "ach-2", name: "Module Master", description: "Complete an entire module", icon: "🏆", unlockedAt: "2026-02-01" },
  { id: "ach-3", name: "7-Day Streak", description: "Learn 7 days in a row", icon: "🔥", unlockedAt: "2026-04-30" },
  { id: "ach-4", name: "Quick Learner", description: "Complete 3 lessons in one day", icon: "⚡", unlockedAt: "2026-02-10" },
  { id: "ach-5", name: "Code Crafter", description: "Submit 10 exercises", icon: "💻", unlockedAt: "2026-03-05" },
  { id: "ach-6", name: "Deep Diver", description: "Spend 5 hours learning", icon: "🌊", unlockedAt: "2026-03-20" },
  { id: "ach-7", name: "Async Pro", description: "Complete the Async module", icon: "⏳" },
  { id: "ach-8", name: "DOM Wizard", description: "Complete the DOM module", icon: "🧙" },
  { id: "ach-9", name: "Century Club", description: "Complete 100 exercises", icon: "💯" },
]

// ─── Mock Streak Calendar ─────────────────────────────────────────────────────
export const mockStreakDays: StreakDay[] = [
  { date: "2026-04-24", active: true },
  { date: "2026-04-25", active: true },
  { date: "2026-04-26", active: false },
  { date: "2026-04-27", active: true },
  { date: "2026-04-28", active: true },
  { date: "2026-04-29", active: true },
  { date: "2026-04-30", active: true },
]

// ─── Mock Mentor Responses ────────────────────────────────────────────────────
export const mockMentorResponses: Record<string, string[]> = {
  ask_doubt: [
    "Great question! Let me clarify that for you. The key thing to understand here is that JavaScript evaluates expressions left to right, so the order of operations matters a lot.",
    "I can see why that's confusing! The short answer is: it depends on the context. When you're inside a function, the scope is local. When you're outside, it's global.",
    "This trips up a lot of learners. The difference is subtle but important — `let` and `const` are block-scoped, while `var` is function-scoped. That means var can 'leak' out of if blocks.",
  ],
  explain_simpler: [
    "Let me break this down like you're completely new to coding. Think of a variable like a labeled box. You put a value in, give it a name, and refer to it later by that name.",
    "Simpler version: imagine functions are like recipes. You write the recipe once (function definition), and you can cook the dish multiple times (function calls) with different ingredients (arguments).",
    "In plain English: an array is just a list. Like a shopping list where each item has a number (index) starting from 0. `fruits[0]` gets the first fruit.",
  ],
  give_analogy: [
    "Here's a great analogy — think of the call stack like a stack of plates. Each time you call a function, you put a plate on top. When the function finishes, the plate comes off. JavaScript can only look at the top plate.",
    "Closures are like a backpack. When a function leaves its outer function, it still carries the variables from that outer scope in its backpack — accessible wherever it goes.",
    "Promises are like ordering food at a restaurant. You order (create the Promise), get a buzzer (the Promise object), and your food either arrives (resolve) or they run out (reject). Meanwhile you can do other things.",
  ],
  give_hint: [
    "Hint: start by looking at what type of value you need to return. Work backwards from the expected output.",
    "Hint: think about which loop type fits best. If you know the count, use `for`. If you don't, consider `while`.",
    "Hint: you don't need to reinvent the wheel — check if there's a built-in array method that does what you need. `find`, `filter`, and `map` cover most cases.",
  ],
  free_text: [
    "That's a great observation! You're thinking like a developer. The pattern you're noticing is called composition — building complex behavior from simple pieces.",
    "Exactly right! You've understood the core concept. Now let's apply it — try writing a small example that demonstrates what you just described.",
    "Almost! You're on the right track. The small distinction is that `===` checks value AND type, while `==` only checks value after type coercion. Always use `===` in practice.",
  ],
}
