import React, {Component} from 'react';

class GeneralRankingByRace extends Component {
  constructor() {
    super();
    this.state = {
      swimmers: []
    };
    this._getRacePoints = this._getRacePoints.bind(this);
    this._getSchoolName = this._getSchoolName.bind(this);
  }
  _getRacePoints(swimmer, raceId) {
    let points = 0;
    let timeObjects = swimmer.times.filter(
      (n) => n.raceId === raceId
    );
    timeObjects.forEach((n) => {
      points += n.points;
    });
    return points;
  }
  _getSchoolName(schools, schoolId) {
    if (schools.length > 0) {
      return schools.filter((n) => n.id === schoolId)[0].name;
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      swimmers: nextProps.swimmers,
      schools: nextProps.schools
    });
  }
  render() {
    let sortedSwimmers = this.state.swimmers.slice().sort(
      (a, b) => this._getRacePoints(b, this.props.raceId) - this._getRacePoints(a, this.props.raceId)
    );
    return (
      <div>
        <ol>
          {sortedSwimmers.map((n, i) => (
            <li key={i}>
              {n.name} {n.surname} ({this._getSchoolName(this.state.schools, n.schoolId)})
              {this._getRacePoints(n, this.props.raceId)} points
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default GeneralRankingByRace;
