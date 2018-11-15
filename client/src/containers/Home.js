import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API, Auth } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      projects: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const projects = await this.projects();
      this.setState({ projects });
    } catch (e) {
      alert(e);
    }

  this.setState({ isLoading: false });
}

projects() {
  return API.get("pma-api", "/users/list");
}

renderprojectsList(projects) {
  return [{}].concat(projects).map(
    (project, i) =>
      i !== 0
        ? <LinkContainer
            key={project.projectId}
            to={`/projects/${project.projectId}`}
          >
            <ListGroupItem header={project.content.trim().split("\n")[0]}>
              {"Created: " + new Date(project.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        : <LinkContainer
            key="new"
            to="/projects/new"
          >
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new project
              </h4>
            </ListGroupItem>
          </LinkContainer>
  );
}

renderLander() {
  return (
    <div className="lander">
      <h1>PMA</h1>
      <p>A project management app!</p>
      <div>
        <Link to="/login" className="btn btn-info btn-lg">
          Login
        </Link>
        <Link to="/signup" className="btn btn-success btn-lg">
          Signup
        </Link>
      </div>
    </div>
  );
}

  renderprojects() {
    return (
      <div className="projects">
        <PageHeader>Your Projects</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderprojectsList(this.state.projects)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderprojects() : this.renderLander()}
      </div>
    );
  }
}
