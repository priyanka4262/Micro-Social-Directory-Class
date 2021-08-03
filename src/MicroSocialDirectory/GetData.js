import react, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router";
import "./GetData.scss";

const usersPerPage = 24;
class GetData extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      selectedUser: [],
      pageNumber: 0,
      displayUsers: [],
      sortIcon: "sort-asc.png",
    };
  }

  componentDidMount() {
    axios.get("https://randomuser.me/api/?results=100").then((response) => {
      this.setState({
        users: response.data.results,
        displayUsers: response.data.results.slice(0, usersPerPage),
      });
    });
  }

  onUserClickHandler = (user) => {
    this.setState({
      selectedUser: user,
    });
    this.props.history.push(`/userDetails/${user.phone}`);
  };

  changePage = ({ selected }) => {
    const usersVisited = selected * usersPerPage;
    this.setState({
      pageNumber: selected,
      displayUsers: this.state.users.slice(
        usersVisited,
        usersVisited + usersPerPage
      ),
    });
  };

  onSortHandler = () => {
    const data = [...this.state.displayUsers];
    let sortedUsers = [];
    if (this.state.sortIcon === "./sort-dsc.png") {
      sortedUsers = data.sort((a, b) => {
        return a.name.first < b.name.first ? 1 : -1;
      });
      this.setState({
        sortIcon: "./sort-asc.png",
      });
    } else {
      sortedUsers = data.sort((a, b) => {
        return a.name.first > b.name.first ? 1 : -1;
      });
      this.setState({
        sortIcon: "./sort-dsc.png",
      });
    }
    this.setState({
      displayUsers: sortedUsers,
    });
  };

  render() {
    const { pageNumber, sortIcon, displayUsers, users } = this.state;
    const pageCount = Math.ceil(users.length / usersPerPage);
    let serialNumber = pageNumber * usersPerPage + 1;
    return (
      <div>
        <table className="table table-bordered mainTable mt-3">
          <thead className=" text-center table-primary">
            <tr>
              <th>ID</th>
              <th>
                Name
                <img
                  className="ascendingImg"
                  onClick={this.onSortHandler}
                  src={sortIcon}
                />
              </th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {displayUsers.map((user, index) => (
              <tr key={index} onClick={() => this.onUserClickHandler(user)}>
                <td>{index + serialNumber} </td>
                <td id="nameElement">{user.name.first}</td>
                <td>
                  <img src={user.picture.thumbnail}></img>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          onPageChange={this.changePage}
          pageCount={pageCount}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    );
  }
}

export default withRouter(GetData);
