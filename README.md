### Task Description for Senior Frontend Developer

#### Overview

You will be tasked with creating the admin interface for managing anamnesis forms within the ClinicOS system. This interface will include features for listing, creating, updating, and deleting anamnesis forms, sections, and questions. You will use Vite, React, TailwindCSS, and TypeScript, along with specific libraries for handling drag-and-drop functionality and table displays. Additionally, you will implement unit tests and end-to-end tests using Playwright.

#### How to run the App

- make sure you have **json-server** installed `npm i json-server -g`
- run the **json-server** with `json-server db.json`
- run the app with `npm run dev`

#### Technologies and Libraries

- **Vite** for building the application

- **React** for the user interface

- **TailwindCSS** for styling

- **TypeScript** for type safety

- **DndKit** for drag-and-drop functionality

- **React-Table** for displaying tables

- **Jest** and **React Testing Library** for unit testing

- **Playwright** for end-to-end testing

#### Task Requirements

1.  **Project Setup**

- [x] Initialize a new Vite project with React and TypeScript.

- [x] Set up TailwindCSS for styling.

- [x] Configure Jest and React Testing Library for unit tests.

- [x] Set up Playwright for end-to-end testing.

2.  **Pages and Functionality**

- Create the following pages with the specified functionalities:

**1. List of All Anamnesis Forms**

- [x] Use `react-table` to display a list of all anamnesis forms.

- [x] Include columns for form title, description, creation date, and actions (view, edit, delete).

- [x] Implement pagination, sorting, and searching functionalities.

- [x] For searching, add debounce functionality and simulate an async search.

**2. Anamnesis Form Detail Page**

- [x] Display the details of a selected anamnesis form.

- [x] Show the sections and questions within the form.

- [x] Use `DndKit` to allow drag-and-drop reordering of sections and questions.

**3. Create Anamnesis Form Page**

- [x] Provide a form to create a new anamnesis form with fields for the title and description.

- [x] Allow adding multiple sections, and within each section, allow adding multiple questions.

- When adding a question, support the following types:

- [x] Short text

- [x] Long text

- [x] Multiple choice

- [x] Date time

- [x] Use `DndKit` for drag-and-drop functionality to reorder sections and questions.

**4. Update Anamnesis Form Page**

- [x] Similar to the create page, but pre-populate the form with the existing data of the selected anamnesis form.

- [x] Allow updating the form, sections, and questions.

- [x] Use `DndKit` for drag-and-drop functionality to reorder sections and questions.

3.  **Deletion Functionality**

- [x] Implement the ability to delete an anamnesis form from the list page.

- [x] Implement the ability to delete a section from a form or a question from a section on the detail and update pages.

4.  **Debounced Search Functionality**

- [x] Implement a search input with debounce functionality.

- [x] Simulate an asynchronous search to fetch and display results.

#### Testing Requirements

5.  **Unit Tests**

- [ ] Write unit tests using Jest and React Testing Library for all components.

- [ ] Ensure comprehensive test coverage for functionality and edge cases.

6.  **End-to-End Tests**

- [ ] Write end-to-end tests using Playwright to test the complete flow of creating, updating, and deleting anamnesis forms, sections, and questions.

- [ ] Ensure that the UI behaves correctly, and the expected data is displayed and manipulated.

#### Detailed Page Descriptions

**1. List of All Anamnesis Forms**

- Create a React component to fetch and display anamnesis forms using `react-table`.

- Include action buttons for viewing, editing, and deleting each form.

- Example Columns:

- Title

- Description

- Created At

- Actions (View, Edit, Delete)

- Implement search with debounce and simulate an async search call.

**2. Anamnesis Form Detail Page**

- Create a React component to display details of the selected anamnesis form.

- Fetch and display form sections and questions.

- Implement drag-and-drop for reordering sections and questions using `DndKit`.

**3. Create Anamnesis Form Page**

- Create a form to input the title and description of a new anamnesis form.

- Allow dynamically adding sections and questions.

- Implement drag-and-drop for reordering sections and questions using `DndKit`.

- Provide the ability to add questions of different types: short text, long text, multiple choice, and date time.

**4. Update Anamnesis Form Page**

- Similar to the create page, but with fields pre-populated with existing data.

- Allow editing the form details, sections, and questions.

- Implement drag-and-drop for reordering sections and questions using `DndKit`.

#### Additional Requirements

- Use TypeScript for all components and ensure type safety.

- Do not use any other component libraries outside of the specified ones.

- Ensure the UI is responsive and user-friendly.

- Provide clear and concise documentation for setting up and running the project.

#### Submission

- Provide a GitHub repository link with your Vite + React + TailwindCSS project.

- Include a README.md with instructions on how to set up and run your project.

- Document your design decisions, especially for the data flow and state management approach.

### Evaluation Criteria

- **Functionality**: The interface works as intended, with proper CRUD operations for forms, sections, and questions.

- **Code Quality**: Clean, readable, and maintainable code.

- **Design**: User-friendly and responsive UI design.

- **Usage of Libraries**: Effective use of `react-table` and `DndKit`.

- **TypeScript Usage**: Proper use of TypeScript for type safety.

- **Debounced Search**: Implementation of search with debounce and async simulation.

- **Testing**: Comprehensive unit tests and end-to-end tests.

- **Documentation**: Clear instructions and well-documented code.

Good luck, and we look forward to reviewing your submission!
