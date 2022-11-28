import { useState, useEffect, React } from "react";
import { db } from "../firebase-config";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";
import CardSkeleton from "../components/CardSkeleton";
import Iterator from "../components/Iterator";

class LoadingState  {
    constructor() {
        this.state = new Loading();
    }

    nextState() {
        this.state = this.state.next();
    }
}

class LoadingStatus {
    constructor(name, nextStatus) {
        this.name = name;
        this.nextStatus = nextStatus;
    }

    next() {
        return new this.nextStatus();
    }
}

class Loading extends LoadingStatus {
    constructor() {
        super('loading', Ready)
    }
}

class Ready extends LoadingStatus {
    constructor() {
        super('ready', Ready)
    }
}

const Info = () => {
    const [newName, setNewName] = useState("");
	const [newSurname, setNewSurname] = useState("");
	const [newCountry, setNewCountry] = useState("");
	const [newSalary, setNewSalary] = useState(0);
	const [newAge, setNewAge] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

	const [employees, setEmployees] = useState([]);
	const [databaseIsEmpty, setDatabaseIsEmpty] = useState(false);
	const employeesCollectionRef = collection(db, "employees");

	const createUser = async (e) => {
		e.preventDefault();

		await addDoc(employeesCollectionRef, { 
			name: newName, 
			surname: newSurname,
			country: newCountry,
			salary: newSalary, 
			age: Number(newAge)
		});

		window.location.reload();
	};

	const checkFormFields = () => {
		const inputs = Array.from(document.querySelectorAll('.form__input'));

		const inputValues = inputs.map(item => {
			return item.value;
		})

		if (!inputValues.includes('')) {
			setIsAllFieldsFilled(true);
		} else {
			setIsAllFieldsFilled(false);
		}
	};

	const updateUserAge = async (id) => {
		const userDoc = doc(db, "employees", id);
		const newFields = { age: newAge };
		await updateDoc(userDoc, newFields);
		window.location.reload();
	};

	const deleteUser = async (id) => {
		const userDoc = doc(db, "employees", id);
		await deleteDoc(userDoc);

		window.location.reload();
	};

	const preventIncorrectValue = (target) => {
		let number = target.value;

		number = number.replace(/[^0-9.]/g, '');

		target.value = number;

		if (number < 0) {
			target.value = Math.abs(number);
		}
	};

	useEffect(() => {
		const getEmployees = async () => {
			const loadingState  = new LoadingState();
			const data = await getDocs(employeesCollectionRef);

			let employeesArr = [];
			
			if (data.docs.length) {
				setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

				employeesArr = [data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))];
			} 
			
			if (!data.docs.length) {
				setDatabaseIsEmpty(true);

				loadingState.nextState();
			}
			
			if (employeesArr.length) {
				loadingState.nextState();
			}
			
			if (loadingState.state.name === 'ready') {
				setIsLoading(false);
			}
		};

		getEmployees();
	}, []);
	
	return (
		<main className="main">
			<form className="form">
				<h1>Employee Form</h1>
				<input
					className="form__input"
					placeholder="Name..."
					onChange={(event) => {
						setNewName(event.target.value);
						checkFormFields();
					}}
				/>
				<input
					className="form__input"
					placeholder="Surname..."
					onChange={(event) => {
						setNewSurname(event.target.value);
						checkFormFields();
					}}
				/>
				<input
					className="form__input"
					placeholder="Country..."
					onChange={(event) => {
						setNewCountry(event.target.value);
						checkFormFields();
					}}
				/>
				<input
					className="form__input"
					placeholder="Age..."
					min="1" 
					max="150"
					onChange={(event) => {
						preventIncorrectValue(event.target);
						setNewAge(event.target.value);
						checkFormFields();
					}}
					/>
				<input
					className="form__input"
					placeholder="Salary..."
					onChange={(event) => {
						preventIncorrectValue(event.target);
						setNewSalary(event.target.value);
						checkFormFields();
					}}
				/>

				<button className="button form__button" data-back="Click!)" disabled={!isAllFieldsFilled} data-front="Add Employee" onClick={createUser}></button>
			</form>
			
			<div className="employees">
				{databaseIsEmpty && 
					<>
						<h1 className="main__title">Oops, your database is empty</h1>
					</>
				}	
				<div className="employees__wrapper">

					{isLoading && 
						<>
							<div className="skeleton"><CardSkeleton /></div>
							<div className="skeleton"><CardSkeleton /></div>
							<div className="skeleton"><CardSkeleton /></div>
							<div className="skeleton"><CardSkeleton /></div>
							<div className="skeleton"><CardSkeleton /></div>
							<div className="skeleton"><CardSkeleton /></div>
						</>
					}
					{/* {console.log(employeesIterator)} */}

					{/* {employeesIterator ? employeesIterator.sortMap():} */}

					<Iterator items={employees} setNewAge={setNewAge} updateUserAge={updateUserAge} deleteUser={deleteUser}/>

					{/* {employees.sort((a, b) => a.age - b.age).map((user, i) => {
						return (
							<div className="employees__item" key={i}>
								<div className="employees__row">
									<h2 className="employees__title">Employee</h2>	
								</div>
								<div className="employees__row">
									<p className="employees__info"><span className="employees__info_bold">Name:</span> {user.name}</p>	
								</div>
								<div className="employees__row">
									<p className="employees__info"><span className="employees__info_bold">Surname:</span> {user.surname}</p>
								</div>
								<div className="employees__row">
									<p className="employees__info"><span className="employees__info_bold">Country:</span> {user.country}</p>
								</div>
								<div className="employees__row">
									<p className="employees__info"><span className="employees__info_bold">Age:</span> {user.age}</p>
								</div>
								<div className="employees__row">
									<p className="employees__info"><span className="employees__info_bold">Salary:</span> {user.salary}</p>	
								</div>
								<div className="employees__row">
									<input 
										type="number"
										className="employees__input"
										placeholder="Type new age" 
										onChange={(event) => {
											setNewAge(event.target.value);
										}}
									/>
								</div>
								<div className="employees__row">
									<button
										className="button button_update-age"
										data-back="Click!)" 
										data-front="Update age"
										onClick={() => {
											updateUserAge(user.id);
										}}
									>
									</button>
								</div>
								<div className="employees__row">
									<button
										className="button"
										data-back="Click!)" 
										data-front="Delete employee"
										onClick={() => {
											deleteUser(user.id);
										}}
									>
									</button>
								</div>
							</div>
						);
					})} */}
				</div>
			</div>
		</main>
	);
}

export default Info;