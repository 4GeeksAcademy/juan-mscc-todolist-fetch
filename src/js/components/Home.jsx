import React from "react";
import List from "./List";



//create your first component
const Home = () => {
	return (
		<div className="vh-100 text-center bg-secondary">
            
			<h1>todos</h1>
			<List/>
			
		</div>
	);
};

export default Home;