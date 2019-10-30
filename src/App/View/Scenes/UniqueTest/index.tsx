import React from "react";
import { Test, TestType, People } from "../../../Controller";
import { withRouter, RouteComponentProps } from "react-router";
import { TestTypeInterface } from "../../../Controller/TestType/interface";
import { PeopleInterface } from "../../../Controller/People/interface";
import moment from "moment";
import { Link } from "react-router-dom";

interface OwnProps { }

interface State {
  currentTestType: TestTypeInterface;
  currentPeople: PeopleInterface;
}

type Props = RouteComponentProps<{}> & OwnProps;

class UniqueTest extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      currentTestType: {
        title: "carregando...",
        start_url: "carregando...",
        objective: "carregando...",
      },
      currentPeople: {
        name: "carregando...",
        email: "carregando...",
        birthday: "carregando...",
      }
    }
  }


  componentDidMount = async () => {
    const params: any = this.props.match.params;
    const testId = parseInt(params.testId);
    const test = await Test.getTestById(testId);
    const currentPeople = await People.getPeopleById(test.people_id);
    const currentTestType = await TestType.getTestTypeById(test.test_type_id);
    this.setState({ currentPeople, currentTestType });
  }

  render() {

    const { currentTestType, currentPeople } = this.state;

    return (
      <section>
        <Link to={currentTestType.id ? `/tiposdeteste/${currentTestType.id}` : "tiposdeteste"}>
          <div className="info">
            <h2>Tipo do teste</h2>
            <div className="wrapper">
              <h3>Título <span>{currentTestType.title}</span></h3>
              <a href={currentTestType.start_url} target="blank">
                <h3>URL <span>{currentTestType.start_url}</span></h3>
              </a>
            </div>
            <h3>Objetivo <span>{currentTestType.objective}</span></h3>
          </div>
        </Link>
        <Link to={currentPeople.id ? `/pessoas/${currentPeople.id}` : "pessoas"}>
          <div className="info">
            <h2>Participante do teste</h2>
            <div className="wrapper">
              <h3>Nome <span>{currentPeople.name}</span></h3>
              <h3>Email <span>{currentPeople.email}</span></h3>
              <h3>Data de Nascimento <span>{moment(currentPeople.birthday).format("DD/MM/YYYY")}</span></h3>
            </div>
          </div>
        </Link>
      </section>
    )
  }
}

export default withRouter(UniqueTest);