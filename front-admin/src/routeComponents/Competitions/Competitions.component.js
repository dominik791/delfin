import React, {Component} from 'react';
import classNames from 'classnames';
import styles from './Competitions.stylesheet.css';

class Nav extends Component {
  constructor() {
    super();
    this._setCurrentCompetition = this._setCurrentCompetition.bind(this);
    this._displayDate = this._displayDate.bind(this);
    this._isChosen = this._isChosen.bind(this);
    this.state = {
      competitions: []
    };
  }
  _setCurrentCompetition(e, id) {
    localStorage.setItem('currentCompetitionId', id);
  }
  _displayDate(date) {
    let dateToReturn = new Date(date);
    return dateToReturn.toLocaleDateString();
  }
  _isChosen(competitionId) {
    return this.props.currentCompetitionId == competitionId;
  }
  render() {
    return (
      <div className={classNames('uk-align-center uk-width-9-10', styles.Competitions)}>
        <h2 className='uk-text-center '>
          Wybierz zawody
        </h2>
        <ul className='uk-list uk-margin-large-top'>
          {this.props.competitions.map((competition, i) => {
            return (
            <li className={classNames(styles.competitionListElem, {[styles.chosen]: this._isChosen(competition.id)})}
                key={i}>
              <h3 className={styles.competitionListElem__date}>{this._displayDate(competition.date)}</h3>
              <div className={styles.competitionListElem__name}>{competition.name}</div>
              <button className='uk-button'
                      onClick={(e) => {
                        this._setCurrentCompetition(e, competition.id);
                        this.props.competitionChanged(e, competition.id);
                      }}>
                Wybierz
              </button>
            </li>
            )
          })}
        </ul>
      </div>

    )
  }
}

export default Nav;
