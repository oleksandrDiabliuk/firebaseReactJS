import React from "react";

export default class Iterator extends React.Component {
	constructor(props) {
        super(props);
		this.index = 0;
		this.items = [];
        this.props = props;
	}

    itemHtml(user, key) {
        return (
            <div className="employees__item" key={key}>
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
                            this.props.setNewAge(event.target.value);
                        }}
                    />
                </div>
                <div className="employees__row">
                    <button
                        className="button button_update-age"
                        data-back="Click!)" 
                        data-front="Update age"
                        onClick={() => {
                            this.props.updateUserAge(user.id);
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
                            this.props.deleteUser(user.id);
                        }}
                    >
                    </button>
                </div>
            </div>
        );
    }

	render() {
        return this.sortMap((user, key) => {  
            return this.itemHtml(user, key);
        })
	}

	first() {
        this.reset();
        return this.next();
    }
    
	next() {
        return this.items[this.index++];
    }

    hasNext() {
        return this.index <= this.items.length;
    }

    reset() {
        this.index = 0;
    }

	sortMap(callback) {
        const resultArray = [];

        var arr = this.props.items.length ? this.props.items : false;

        if (arr) {
            let sortedEmployeesArr = arr.length ? arr.sort((a, b) => a.age - b.age) : false;

            if (sortedEmployeesArr) {
                this.items = sortedEmployeesArr;
        
                for (var item = this.first(); this.hasNext(); item = this.next()) {
                    resultArray.push(callback(item, this.index))
                }
            }
        }

        return resultArray;
	}
}
