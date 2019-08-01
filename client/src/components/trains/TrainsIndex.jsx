import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import * as trainsActions from '../../actions/trains';
import * as stationsActions from '../../actions/stations';

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#202020',
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#ededed",
  },
  activeButton: {
    margin: theme.spacing.unit,
    backgroundColor: "#FFFF00",
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
})

class TrainsIndex extends Component {
  constructor(props) {
    super(props)

    this.directionToggle = this.directionToggle.bind(this)
    this.filteredTrains = this.filteredTrains.bind(this)
    this.selectDestination = this.selectDestination.bind(this)
    this.buttonClass = this.buttonClass.bind(this)
  }

  componentDidMount() {
    this.props.actions.trainsActions.getTrains();
    this.props.actions.stationsActions.getStations();
    this.pollTrains()
  }

  trainImage(trainName) {
    if (trainName == "N") {
      return "n_train.png"
    } else if (trainName == "W") {
      return "w_train.png"
    }
  }

  directionToggle(direction) {
    localStorage.setItem('direction', direction);
    this.props.actions.trainsActions.updateDirection(direction);
  }

  filteredTrains() {
    if (this.props.trains.length > 0) {
      return this.props.trains.filter(train => train.direction == this.props.direction)
    } else {
      return []
    }
  }

  selectDestination(e) {
    localStorage.setItem('station', e.target.value);
    this.props.actions.stationsActions.selectStation(e.target.value);
  }

  buttonClass(buttonName, classes) {
    if (buttonName == this.props.direction) {
      return classes.activeButton
    } else {
      return classes.button
    }
  }

  pollTrains() {
    window.setInterval(
      function() {
        this.props.actions.trainsActions.getTrains();
    }.bind(this), 30000)
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Astoria Arc - Trains
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              <Button
                onClick={(e) => this.directionToggle("Manhattan")}
                variant="contained"
                color="default"
                className={this.buttonClass("Manhattan", classes)}>
                Manhattan Bound
              </Button>

              <Button
                onClick={(e) => this.directionToggle("Astoria")}
                variant="contained"
                color="default"
                className={this.buttonClass("Astoria", classes)}>
                Astoria Bound
              </Button>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Starting Station</InputLabel>
                <Select
                  native
                  value={this.props.selectedStation}
                  onChange={(e) => this.selectDestination(e)}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                {this.props.stations.map(function(station) {
                  return(<option value={station.station_id}>{station.name}</option>)
                })}
                </Select>
              </FormControl>
              {this.filteredTrains().map(train => (
                <Grid item key={train.id} sm={12} md={12} lg={12}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Avatar
                        alt="Remy Sharp"
                        src={this.trainImage(train.name)}
                        className={classes.avatar} />
                      <Typography gutterBottom variant="h5" component="h3">
                        {`${train.direction} Bound starting at: ${train.time}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Astoria Arc - Trains
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            An Archipelago group.
          </Typography>
        </footer>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    trains: state.trains.trains,
    direction: state.trains.direction,
    stations: state.stations.stations,
    selectedStation: state.stations.selectedStation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      trainsActions: bindActionCreators(trainsActions, dispatch),
      stationsActions: bindActionCreators(stationsActions, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrainsIndex));

