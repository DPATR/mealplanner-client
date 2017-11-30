# DESCRIPTION

This is an application designed to be used for Meal planning, especially when traveling.  Components include a Meal Plan that includes all meals as well as a Grocery List that can include all ingredients that may be purchased to prepare meals.

Each user will have their own collection of meals that cannot be viewed by other system users.  Each user will have their own collection of ingredients that cannot be viewed by other system users.

Authorization:

When accessing the application for the first time, the person must Sign Up with an email address and password and then Sign In.

An option to Change Password will be available once you are signed in.

A system user should Sign Out before exiting the application.

Grocery List:

Generates a list of existing Grocery Items.  Functionality includes Add, Edit and Remove Grocery Items.

Links include:
- Search Epicurious Recipe site using the Grocery Item as a search parameter
- Search by Location uses the Google Maps service, the system user's current location coordinates and a search
  string.

All search results are rendered in a browser window.

View Menu:

Generates a list of existing Meals.  Functionality includes Add, Edit and Remove Meals.

Links include:
- Search Epicurious Recipe site using the Meal Entree as a search parameter

All search results are rendered in a browser window.

Author: Denise Patriquin Date: 12/1/2017

# VIEW ONLINE

Client Meal Planner Application: https://dpatr.github.io/mealplanner-client

API Meal Planner Application: https://ancient-gorge-70615.herokuapp.com

API GitHub Repository: https://github.com/DPATR/mealplanner-api

## Technologies

1. JavaScript
2. jQuery for DOM manipulation and event handling
3. AJAX for interacting with an API
4. CSS for styles
5. Bootstrap
6. Handlebars for templating
7. Modal dialog box
8. Google Geolocation
9. Google Maps Service

## Planning and Approach

Original Wireframe: https://imgur.com/GxHKhVT

User Stories: https://imgur.com/irUjwzR

Approach:

I used a top-down analysis for this project. After doing some research on popular Menu Planning applications, I designed my own wireframe that would be appropriate for my intended use.

The API was designed and tested with authentication and data first. The Client was then developed and tested using the API structure.

For the Client, I began by writing pseudo-code and then built code modules.

I used test scenarios and each module was unit tested. I followed with integration and end-to-end testing for the application as a whole.

## Future Enhancements

1. Add calendar functionality for planning weekly menus in the future.
2. Integrate meal categories to enable more specific search criteria.
