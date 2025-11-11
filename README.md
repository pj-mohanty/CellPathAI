#  CellPathAI

An integrated full-stack project combining **Spring Boot + Firestore (backend)** and **React + Tailwind (frontend)**.
CellPathAI provides an interactive educational tool for healthcare students, focused on exploring
a single curated cell or metabolic pathway in a beginner-friendly way. It helps students visualize
pathways, access protein/enzymes metadata, and test their knowledge with quizzes, making
learning more interactive and engaging

---

##  Getting Started

### 1 Clone the Repository
```bash
git clone https://github.com/pj-mohanty/CellPathAI.git
cd CellPathAI
```

### 2 Backend Setup (Spring Boot + Firestore)
1. Open the Backend in IntelliJ (Recommended)

2. In IntelliJ IDEA, go to
- File → Open → Select
- backend/server folder (the one containing pom.xml).

- IntelliJ should automatically detect it as a Maven project and start downloading dependencies from the pom.xml.

- Wait until you see “Build completed successfully” in the bottom status bar.

If IntelliJ doesn’t automatically detect the project as Maven:

- Right-click the pom.xml file → Add as Maven Project

- Then go to View → Tool Windows → Maven → Reload All Maven Projects

 Manually Build Maven (if automatic build fails)

If IntelliJ does not build the backend automatically, you can manually force Maven to build it inside IntelliJ:

Option 1: Using IntelliJ GUI

- Go to the Maven panel (right sidebar or via View → Tool Windows → Maven)

- Expand Lifecycle

- Double-click clean, then install

- This runs the equivalent of:

mvn clean install


You should see “BUILD SUCCESS” in the IntelliJ console.

Option 2: Using Command Line (Optional)

If you prefer the terminal:

cd backend/server
mvn clean install


This will compile and package your Spring Boot backend locally.

3.  Configure Firebase (Firestore Connection)

- To connect your backend to Firestore:

- Go to Firebase Console
 and create a new project.

- In the sidebar, navigate to
Build → Firestore Database → Create Database.

- Then go to
Project Settings → Service Accounts → Generate new private key(select java).

-Download the JSON key and rename it to:

firebase-key.json


- Save the file at:

backend/server/src/main/resources/firebase-key.json


- Your final path should be exactly:

backend/server/src/main/resources/firebase-key.json

4. (Optional) Seed Firestore with Mock Data

You can pre-fill your Firestore database with example quizzes:

Open this file:

backend/server/src/main/java/com/cellpathai/utils/FirestoreSeeder.java


Click the Run ▶️ button at the top of IntelliJ.

You should see logs like:
```bash
Starting Firestore seeding...
Added quiz: Genetics - Quiz 1
Successfully seeded 10 quiz records!
Seeding process completed!
```

5. ▶️ Run the Backend Server

Open the file:

backend/server/src/main/java/com/cellpathai/Main.java


Click the green Run ▶️ button.

Once started, the console should display:

Tomcat started on port 8080
Application started successfully


Verify by visiting:
 http://localhost:8080/api/dashboard/quizzes

If you see quiz JSON data, your backend is working correctly 

6. Optional: Run Backend from Terminal (Alternative)

If you’ve set up Maven system-wide:

Check Maven Installation
mvn -v


If this doesn’t work, install Maven:

Windows: Download Maven
 → Extract → Add /bin folder to your system PATH

macOS/Linux:

brew install maven


or

sudo apt install maven

Run the Server
cd backend/server
mvn spring-boot:run


You’ll see logs like:

Tomcat started on port 8080
Application started successfully


### 3. Frontend Setup (React + Tailwind)
Step 1: Open Frontend Folder
```bash
cd client
```

Step 2: Install Dependencies
```bash
npm install
```

Step 3: Start the Frontend App
```bash
npm run start
```

The frontend will be available at:

http://localhost:3000



### AI Tools Usage Documentation

When setting up the Spring Boot backend and Maven build system, ChatGPT helped identify missing configurations and guided the correct setup process, including initializing the pom.xml, resolving dependency issues, and ensuring the backend compiled successfully in IntelliJ and through the command line.

While building the React + Tailwind CSS frontend, AI support was instrumental in  the initial  React project setup, configuring Tailwind correctly, and ensuring styling consistency across the dashboard. This guidance saved time in resolving build and dependency errors during setup.

For the Firestore integration, ChatGPT provided an example for Firestore initializer and Firebase Admin configuration for the backend. I then manually updated the project ID and JSON key path (firebase-key.json) to match my Firebase project credentials.

During frontend-backend integration, ChatGPT offered examples of how to use the fetch() API call with proper error handling. I later adjusted the endpoint paths and configured CORS settings to enable communication between localhost:8080 (backend) and localhost:3000 (frontend).

When encountering a “Whitelabel Error Page” in Spring Boot, AI assistance explained that the issue occurred because of unmapped endpoints. I resolved this manually and defining the correct /api/dashboard/quizzes mapping.

Finally, for populating mock Firestore data, ChatGPT helped in understanding how to use a FirestoreSeeder to update database that generated random quiz records. I customized field names (quiz, topic, score, status, etc.) to match the structure expected by the React dashboard.

For making the login page, ChatGPT helped me understand how Firebase is used, especially in the LoginForm.js file. I used Firebase before for another class, but I forgot how the code for LoginForm.js worked, so asked Chat to explain how different functions worked, and I modified the code to work in our webiste.

AI also helped me pinpoint and resolve an issue that I was getting when trying to connect the Login.jsx file to App.jsx. By putting my error message into ChatGPT, I was able to figure out that my firebaseAuth was not getting imported properly, and I was able to resolve the issue.

AI also helped me to format the login page in Login.jsx so that it looks nicer and more polished. It gave me some Tailwind CSS formatting to use in my divs in order to make the login page look nicer.

AI helped in developing the Quiz Analytics Dashboard, especially in implementing visual components like pie charts and bar graphs to display quiz performance insights. It provided examples for structuring React state management and integrating dynamic data with chart components.

### Citations & References

This project was built with help from:

Firebase Admin SDK for Java Docs

Spring Boot Reference Guide

React + Vite Documentation

Tailwind CSS Documentation

ChatGPT (OpenAI, 2025) — assisted in debugging and refactoring backend–frontend integration.
