import { useEffect, useState } from 'react';
import WorkoutDetail from '../components/WorkoutDetail';
function Home() {

  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchWorkout = async ()=>{
      const response = await fetch("/api/workouts");
      const json = await response.json();   // json will be an array of docs

      if(response.ok){
        setWorkouts(json);
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
    </div>
  )
}

export default Home