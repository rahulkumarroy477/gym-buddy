import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import WorkoutDetail from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';
function Home() {
  const {workouts, dispatch} = useWorkoutsContext();
  useEffect(() => {
    const fetchWorkout = async ()=>{
      const response = await fetch("/api/workouts");
      const json = await response.json();   // json will be an array of docs

      if(response.ok){
        dispatch({type:'SET_WORKOUTS',payload:json})
      }
    }

    fetchWorkout();
   },
    []);

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