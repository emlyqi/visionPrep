Required to run program: Node.js, PapaParse
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
3. Run the application: ```npm start```

The web app runs at http://localhost:3000.
## Known Bugs
- Light mode-dark mode toggle is not functional
- Web app occasionally freezes after reloading the calendar several times
## Support
## Sources