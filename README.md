# CSS Audit

A utility designed to parse, extract, and de-duplicate CSS selectors. It provides a precise inventory of classes and IDs within your stylesheets.

## Features

*   **AST-Based Parsing**: Leverages PostCSS for deep analysis of stylesheets rather than regular expressions.
*   **Unique Extraction**: Automatically filters out duplicates to provide a clean set of unique classes and IDs.
*   **Complex Selector Support**: Handles nested selectors, media queries, and pseudo-elements with ease.
*   **Alphabetical Sorting**: Generates predictably ordered output for easier diffing and manual review.
*   **Audit Reporting**: Exports results directly to a text file for integration into larger auditing workflows.
