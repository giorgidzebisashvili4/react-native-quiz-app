# React Native Quiz App

## 📌 Overview

This is a React Native quiz application that allows users to select a quiz category and difficulty level, answer multiple-choice questions fetched from the OpenTDB API, and receive a score at the end. The app is designed with a clean and intuitive UI, optimized for performance, and follows best coding practices.

## 🚀 Features

- Fetches quiz questions from the **OpenTDB API**
- Users can **select a category and difficulty level** before starting the quiz
- Displays **multiple-choice questions** with real-time feedback
- **Tracks and displays the final score**
- **Allows users to restart** the quiz
- Optimized performance with **lazy loading, React.memo, useMemo, and useCallback**
- Accessible and mobile-friendly UI

## 🛠️ Technologies Used

- **React Native** (Expo)
- **React Navigation** for screen transitions
- **Context API** for state management
- **React Native Testing Library & Jest** for unit testing

## 📂 Folder Structure

```
📦 quiz-app
 ┣ 📂 src
 ┃ ┣ 📂 components      # Reusable UI components
 ┃ ┣ 📂 screens         # Screens (Home, Quiz, Result)
 ┃ ┣ 📂 utils           # Helper functions
 ┃ ┣ 📂 hooks           # Custom hooks
 ┃ ┗ 📂 assets          # Images, icons
 ┣ 📄 App.js            # Main entry point
 ┣ 📄 package.json      # Dependencies & scripts
 ┗ 📄 README.md         # Project documentation
```

## 🔧 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quiz-app.git
   cd quiz-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npx expo start
   ```

## ✅ Testing

Run unit tests using Jest & React Native Testing Library:

```sh
npm test
```

## 📈 Performance Optimizations

- **Lazy loading screens** using `React.lazy` & `Suspense`
- **Memoization** with `React.memo`, `useMemo`, and `useCallback`
- **FlatList optimizations** for efficient rendering
- **Minimal re-renders** by optimizing state updates

## 🛠️ Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Added a new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## 📝 License

This project is licensed under the MIT License.

---

🔥 **Enjoy coding & happy learning!** 😊
