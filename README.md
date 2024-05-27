# 'visionPrep
'visionPrep is a web app that allows the user to easily prepare a school's supervision plan for a specified time period.

'visionPrep can be accessed through the following link: https://visionprep24.web.app/
## Features
### Upload
The user can upload a .csv file which contains the staff names, loads, free days, etc.
### Customization
The user can further customize the calendar with information such as the number of days of rotation, the day of the starting date, and the time interval.
### Calendar Display
'visionPrep displays a calender with each day from Monday to Friday along with the date and day of rotation. The following rows include the duty names and times along with the staff members assigned to each duty. By clicking on the reload button located on the top left corner, the staff members can be shuffled, allowing for multiple different options of schedules.
### Calender Editing
The days in the calender can be switched to become a School Day, Holiday, or PA Day using the right sidebar. By pressing the reload button, these changes will processed and the calendar will be manipulated to match the changes. Furthermore, each individual staff member can be change by double-clicking on a certain cell and entering a different name.
### Download
By clicking the download button located on the top left corner beside the reload button, the user can download the calendar as a .csv file.
## Installation
1. Clone this repository and cs into the frontend folder
```
git clone https://github.com/emlyqi/visionPrep.git
cd frontend
```
2. Install all the node_modules: ```npm install```
## Known Bugs
- Light mode-dark mode toggle is not functional
- Web app occasionally freezes after reloading the calendar several times
## Support
Please contact the developer at emilyqi2019@gmail.com or jamie.xiao.ca@gmail.com for support or feature requests.
## Sources
| Citation | Purpose |
|:-:|:-:|
| [1] “Get started with Firebase hosting,” Google, https://firebase.google.com/docs/hosting/quickstart (accessed May 26, 2024). | To host the final web app at visionprep24.web.app |
| [2] MozDevNet, “Array.prototype.concat() - javascript: MDN,” MDN Web Docs, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat (accessed May 26, 2024). | To repeat the generated schedule of 6-8 weeks for the duration of the selected period of time |
| [3] DarthWader and Faly, “How to check if a two dimensional array includes a string?,” Stack Overflow, https://stackoverflow.com/questions/48538162/how-to-check-if-a-two-dimensional-array-includes-a-string (accessed May 26, 2024). | To check if a particular staff member is able to supervise the gym or weight room; to check if a particular staff member has already been scheduled |
| [4] J. Bubb, “How to shuffle an array in JavaScript,” DEV Community, https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way (accessed May 26, 2024). | To randomize the supervision schedule-generation process |
| [5] MozDevNet, “Array.prototype.findIndex() - javascript: MDN,” MDN Web Docs, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex (accessed May 26, 2024). | To understand the difference between indexOf and findIndex; to find the index of a particular staff member |
| [6] “Render different component on click without react router - REACT,” YouTube, https://www.youtube.com/watch?v=eGaaw1Py2aY&ab_channel=h3webdevtuts (accessed May 26, 2024). | To switch between components once a button is clicked |
| [7] M. Mandal, “How to parse or read CSV files in reactjs,” Medium, https://medium.com/how-to-react/how-to-parse-or-read-csv-files-in-reactjs-81e8ee4870b0 (accessed May 26, 2024). | To parse the data in the CSV file |
| [8] E. Qi, “Night mode colour changing,” replit, https://replit.com/@EMILYQI1/Night-Mode-Colour-Changing#script.js (accessed May 26, 2024). | To switch the colours of the application between dark mode and light mode |
| [9] “React switch component - material UI,” React Switch component - Material UI, https://mui.com/material-ui/react-switch/ (accessed May 26, 2024). | To add a switch component in React |
| [10] “React grid: Row styles: Ag Grid,” React Grid: Row Styles | AG Grid, https://ag-grid.com/react-data-grid/row-styles/ (accessed May 26, 2024). | To learn the various features and customization options of an Angular grid |
| [11] “React number input component and hook - base UI,” React Number Input component and hook - Base UI, https://mui.com/base-ui/react-number-input/ (accessed May 26, 2024). | To add a number input component in React |
| [12] “React date calendar component - MUI X,” React Date Calendar component - MUI X, https://mui.com/x/react-date-pickers/date-calendar/ (accessed May 26, 2024). | To add a date calendar component in React |
| [13] “React select component - material UI,” React Select component - Material UI, https://mui.com/material-ui/react-select/ (accessed May 26, 2024). | To add a select component in React |
| [14] “Toggle button react component - material UI,” React component - Material UI, https://mui.com/material-ui/react-toggle-button/ (accessed May 26, 2024). | To add a toggle button component in React |
| [15] “React text field component - material UI,” React Text Field component - Material UI, https://mui.com/material-ui/react-text-field/ (accessed May 26, 2024). | To add a text field component in React |
| [16] “React time picker component - MUI X,” React Time Picker component - MUI X, https://mui.com/x/react-date-pickers/time-picker/ (accessed May 26, 2024). | To add a time picker component in React |
| [17] “React time range field components - MUI X,” React Time Range Field components - MUI X, https://mui.com/x/react-date-pickers/time-range-field/ (accessed May 26, 2024). | To add a time range field component in React |
| [18] “React date picker component - MUI X,” React Date Picker component - MUI X, https://mui.com/x/react-date-pickers/date-picker/ (accessed May 26, 2024). | To add a date picker component in React |