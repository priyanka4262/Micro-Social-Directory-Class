import axios from "axios";
import react, { Component } from "react";
import { withRouter } from "react-router";
import "./DisplayUserDetails.scss";
class DisplayUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?phone={params.id}")
      .then((response) => {
        this.setState({
          userData: response.data.results[0],
        });
      });
  }

  onClickListHandler = () => {
    this.props.history.push("/");
  };
  render() {
    const { userData } = this.state;
    return (
      <div className="d-flex align-items-center flex-column">
        <div className="card text-center" style={{ width: "29rem" }}>
          <div className="userDetails table-primary">User Details</div>
          <div className="card-body">
            <div className="text-center">
              <img className="userImg" src={userData.picture?.large}></img>
            </div>
            <table className="table mt-4 ">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    {userData.name?.first}
                    {userData.name?.last}
                  </td>
                </tr>
                <tr>
                  <td>Email ID</td>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{userData.phone}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{userData.gender}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{userData.dob?.date}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{userData.dob?.age}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <a
          type="button"
          className="line-dark pe-auto backToList"
          onClick={this.onClickListHandler}
        >
          Back to list
        </a>
      </div>
    );
  }
}
export default withRouter(DisplayUserDetails);
