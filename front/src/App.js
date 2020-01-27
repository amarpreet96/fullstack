import React, {Component} from 'react';
import axios from 'axios';

class App extends React.Component {

	state = {
				data: [],
				id:0,
				message: null,
				intervalIsSet: false,
				idToDelete: null,
				idToUpdate: null,
				objectToUpdate: null
	};

	ComponentDidMount() {
		this.getDataFromDb();
		// !false = true will work for true only
		if(!this.state.intervalIsSet) {
			let interval = setInterval(this.getDataFromDb,1000);
			this.setState({intervalIsSet: interval});
		}
	}

	componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  //calling backend api to put data in DB
  putDataToDB = (message) => {
  	let currentIds = this.state.data.map((data)=>{data.id});
  	let idtoBeAdded = 0;
  	while(currentIds.includes(idtoBeAdded)){
  		++idtoBeAdded;
  	}
  

  axios.post('http://localhost:3001/api/putData', {

      id: idToBeAdded,
      message: message
    });
 };

//
 deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };
 //
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

	render(){
		return <div>setting up </div>;
	}
}

export default App;