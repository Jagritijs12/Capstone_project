import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../frontend/src/firebase-config";

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchTasks = async () => {
            const user = auth.currentUser;
            if (!user) {
                console.warn("No user is logged in.");
                return;
            }
            const tasksRef = collection(db, "tasks");
            const q = query(tasksRef, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksData);
        };
        fetchTasks();
    }, [db]);

    return (
        <div>
            <h1>Your Analysis</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <a href={`/task/${task.id}`}>{task.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
