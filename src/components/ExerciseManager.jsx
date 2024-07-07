// import React, { useState } from "react";
// import ExerciseList from "./ExerciseList";
// import axios from "axios";

// const ExerciseManager = () => {
//   const [exercises, setExercises] = useState([]);
//   const [fetchingExercises, setFetchingExercises] = useState(false);


//   const fetchExercises = async () => {
//     try {
//       setFetchingExercises(true);
//       const response = await axios.get("/api/exercise");
//       setExercises(response.data);
//     } catch (err) {
//       console.error("Error fetching exercises:", err);
//     } finally {
//       setFetchingExercises(false);
//     }
//   };


//   const handleExerciseDelete = async (exerciseId) => {
//     console.log(exercises)
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`/api/exercise/${exerciseId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchExercises();
//     } catch (err) {
//       console.error("Error deleting exercise:", err);
//     }
//   };

//   return (
//     <div>
//       <h1>Exercise Manager</h1>
//       <ExerciseList fetchExercises={fetchExercises} />
//       <h2>Exercise List</h2>
//       {fetchingExercises ? (
//         <p>Loading exercises...</p>
//       ) : (
//         <ul>
//           {exercises.map((exercise) => (
//             <li key={exercise.id}>
//               {exercise.name} - {exercise.description}
//               <button
//                 onClick={() => handleExerciseDelete(exercise.id)}
//                 className="button is-danger is-small ml-2"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ExerciseManager;
