import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import WorkoutDetail from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';
const apiUrl = "https://gym-buddy-backend-342b.onrender.com";
function Home() {
  const {workouts, dispatch} = useWorkoutsContext();
  useEffect(() => {
    const fetchWorkout = async ()=>{
      const response = await fetch(`${apiUrl}/api/workouts`);
      const json = await response.json();   // json will be an array of docs

      if(response.ok){
        dispatch({type:'SET_WORKOUTS',payload:json})
      }
    }

    fetchWorkout();
   },
    [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout)=>(
          <WorkoutDetail key={workout._id} workout = {workout}>{workout.title}</WorkoutDetail>
        ))}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home