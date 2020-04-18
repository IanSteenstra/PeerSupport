// import React, { Component } from "react";
// import { Auth } from "aws-amplify";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

// export default class ChangePassword extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       password: "",
//       oldPassword: "",
//       isChanging: false,
//       confirmPassword: ""
//     };
//   }

//   validateForm() {
//     return (
//       this.state.oldPassword.length > 0 &&
//       this.state.password.length > 0 &&
//       this.state.password === this.state.confirmPassword
//     );
//   }

//   handleChange = event => {
//     this.setState({
//       [event.target.id]: event.target.value
//     });
//   };

//   handleChangeClick = async event => {
//     event.preventDefault();

//     this.setState({ isChanging: true });

//     try {
//       const currentUser = await Auth.currentAuthenticatedUser();
//       await Auth.changePassword(
//         currentUser,
//         this.state.oldPassword,
//         this.state.password
//       );

//     } catch (e) {
//       alert(e.message);
//       this.setState({ isChanging: false });
//     }
//     this.props.history.push("/profile");
//   };

//   render() {
//     return (
//       <div className="ChangePassword">
//         <form onSubmit={this.handleChangeClick}>
//           <FormGroup bsSize="large" controlId="oldPassword">
//             <ControlLabel>Old Password: </ControlLabel>
//             <FormControl
//               type="password"
//               onChange={this.handleChange}
//               value={this.state.oldPassword}
//             />
//           </FormGroup>
//           <FormGroup bsSize="large" controlId="password">
//             <ControlLabel>New Password: </ControlLabel>
//             <FormControl
//               type="password"
//               value={this.state.password}
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <FormGroup bsSize="large" controlId="confirmPassword">
//             <ControlLabel>Confirm Password: </ControlLabel>
//             <FormControl
//               type="password"
//               onChange={this.handleChange}
//               value={this.state.confirmPassword}
//             />
//           </FormGroup>
//           <Button
//             block
//             bsSize ="large"
//             disabled ={!this.validateForm()}
//             type = "submit"
//           >
//             Change Password
//           </Button>
//         </form>
//       </div>
//     );
//   }
// }