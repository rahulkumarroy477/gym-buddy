import { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext'

import WorkoutDetail from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';

// const apiUrl = "https://gym-buddy-backend-342b.onrender.com";
const apiUrl = "http://localhost:4000";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true); // Set loading to true before fetching
      const response = await fetch(`${apiUrl}/api/workouts`,{
        headers : {
          'Authorization': `Bearer ${user.token}`
        }
      });
      // const response = await fetch(`/api/workouts`);
      const json = await response.json(); // json will be an array of docs

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
      setLoading(false); // Set loading to false after fetching
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          workouts && workouts.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout}>
              {workout.title}
            </WorkoutDetail>
          ))
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
